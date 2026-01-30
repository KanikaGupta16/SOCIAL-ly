import os
import json
import requests
from urllib.parse import quote
from dotenv import load_dotenv
import anthropic
from apify_client import ApifyClient

load_dotenv()

# Minimum engagement threshold to filter high performers
MIN_LIKES = 50

# Initialize clients
client = anthropic.Anthropic()
apify = ApifyClient(os.getenv("APIFY_API_KEY"))

def get_base_dir():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def call_llm(system_prompt: str, user_prompt: str) -> str:
    """Call LLM using the exact custom code pattern"""
    message = client.messages.create(
        model="MiniMax-M2.1",
        max_tokens=1000,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user_prompt
                    }
                ]
            }
        ]
    )

    result = ""
    for block in message.content:
        if block.type == "thinking":
            print(f"Thinking:\n{block.thinking}\n")
        elif block.type == "text":
            result += block.text

    return result

def read_profile():
    """Read user profile from profile.json"""
    profile_path = os.path.join(get_base_dir(), "profile.json")
    try:
        with open(profile_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise Exception("profile.json not found")

def post_to_linkedin(text: str, image_url: str = None) -> dict:
    """Post content to LinkedIn via SIM.ai workflow"""
    api_key = os.getenv("SIM_API_KEY")
    if not api_key:
        return {"error": "SIM_API_KEY not found in environment"}

    response = requests.post(
        "https://www.sim.ai/api/workflows/cf90aaaa-498b-4752-9564-60e9b68da3b2/execute",
        headers={
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        },
        json={
            "text": text,
            "imageUrl": image_url or "",
            "imageBase64": "",
            "visibility": "public"
        }
    )
    return response.json()

def search_influencers(industry: str, topics: list) -> list:
    """Search for LinkedIn influencers with high engagement using Apify"""
    # Build simple keywords - just use topics, properly encoded
    keywords = " ".join(topics[:3])
    encoded_keywords = quote(keywords)

    # Simple search URL
    search_url = f"https://www.linkedin.com/search/results/content/?keywords={encoded_keywords}&origin=FACETED_SEARCH"
    print(f"  Search URL: {search_url}")

    run_input = {
        "urls": [search_url],
        "limitPerSource": 30,
        "deepScrape": True
    }

    try:
        run = apify.actor("supreme_coder/linkedin-post").call(run_input=run_input)

        posts_with_authors = []

        if run and "defaultDatasetId" in run:
            for item in apify.dataset(run["defaultDatasetId"]).iterate_items():
                # Extract author info using correct field names from Apify response
                name = item.get("authorName")
                url = item.get("authorProfileUrl")
                likes = item.get("numLikes") or 0
                comments = item.get("numComments") or 0

                if name and url:
                    posts_with_authors.append({
                        "name": name,
                        "profile_url": url,
                        "likes": likes,
                        "comments": comments,
                        "engagement": likes + (comments * 2)
                    })

        print(f"  Extracted {len(posts_with_authors)} posts with author info")

        # Sort by engagement, no minimum threshold for now
        posts_with_authors.sort(key=lambda x: x["engagement"], reverse=True)

        # Dedupe by author
        seen = set()
        influencers = []
        for p in posts_with_authors:
            if p["profile_url"] not in seen:
                seen.add(p["profile_url"])
                influencers.append({
                    "name": p["name"],
                    "profile_url": p["profile_url"],
                    "engagement": p["engagement"]
                })
                print(f"  Found: {p['name']} ({p['likes']} likes, {p['comments']} comments)")

        return influencers[:10]
    except Exception as e:
        print(f"Error searching influencers: {e}")
        import traceback
        traceback.print_exc()
        return []

def scrape_posts(profile_urls: list) -> list:
    """Scrape posts from LinkedIn profiles using Apify"""
    run_input = {
        "urls": profile_urls,
        "limitPerSource": 5
    }

    try:
        run = apify.actor("supreme_coder/linkedin-post").call(run_input=run_input)

        posts = []
        if run and "defaultDatasetId" in run:
            for item in apify.dataset(run["defaultDatasetId"]).iterate_items():
                posts.append({
                    "author": item.get("authorName") or item.get("author", {}).get("name"),
                    "content": item.get("text") or item.get("content", ""),
                    "likes": item.get("likeCount") or item.get("likes", 0),
                    "comments": item.get("commentCount") or item.get("comments", 0),
                    "date": item.get("date") or item.get("postedAt", "Unknown")
                })

        return posts
    except Exception as e:
        print(f"Error scraping posts: {e}")
        return []

def analyze_content(posts: list, profile: dict) -> str:
    """Use LLM to analyze scraped posts"""
    posts_text = json.dumps(posts[:20], indent=2)

    system_prompt = "You are a LinkedIn content strategist who analyzes viral posts to identify patterns."

    user_prompt = f"""Analyze these LinkedIn posts and identify:
1. Common hooks and opening lines
2. Writing patterns and structures
3. Topics that get high engagement
4. Tone and style characteristics

Posts:
{posts_text}

User Profile (to tailor analysis):
- Name: {profile['name']}
- Industry: {profile['industry']}
- Topics: {', '.join(profile['topics'])}
- Preferred tone: {profile['tone']}

Provide a concise analysis."""

    return call_llm(system_prompt, user_prompt)

def generate_posts(analysis: str, profile: dict) -> str:
    """Use LLM to generate LinkedIn posts"""
    system_prompt = "You are a top-tier LinkedIn ghostwriter who creates viral, high-value content."

    user_prompt = f"""Based on this content analysis and user profile, write 3 LinkedIn posts.

ANALYSIS:
{analysis}

USER PROFILE:
- Name: {profile['name']}
- Title: {profile['title']}
- Bio: {profile['bio']}
- Industry: {profile['industry']}
- Topics: {', '.join(profile['topics'])}
- Tone: {profile['tone']}

Requirements:
- Each post should have a strong hook in the first line
- Keep posts between 150-300 words
- Include relevant hashtags at the end
- Match the user's preferred tone: {profile['tone']}
- Focus on topics: {', '.join(profile['topics'])}

Format each post clearly with "POST 1:", "POST 2:", "POST 3:" headers."""

    return call_llm(system_prompt, user_prompt)

class LinkedInCrew:
    """Main automation class - runs the full pipeline"""

    def run(self):
        print("Starting LinkedIn content generation pipeline...")

        # Step 1: Read profile
        print("Reading profile...")
        profile = read_profile()
        print(f"Profile loaded: {profile['name']}")

        # Step 2: Find influencers
        print(f"Searching for influencers in {profile['industry']}...")
        influencers = search_influencers(profile['industry'], profile['topics'])
        print(f"Found {len(influencers)} influencers")

        if not influencers:
            print("No influencers found, generating posts based on profile...")
            return generate_posts("No external content available for analysis.", profile)

        # Step 3: Scrape their posts
        print("Scraping influencer posts...")
        urls = [inf['profile_url'] for inf in influencers]
        posts = scrape_posts(urls)
        print(f"Scraped {len(posts)} posts")

        if not posts:
            print("No posts scraped, generating based on profile...")
            return generate_posts("No external content available for analysis.", profile)

        # Step 4: Analyze content
        print("Analyzing content patterns...")
        analysis = analyze_content(posts, profile)

        # Step 5: Generate posts
        print("Generating LinkedIn posts...")
        result = generate_posts(analysis, profile)

        print("Pipeline complete!")
        return result
