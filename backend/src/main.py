from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.agents import LinkedInCrew, post_to_linkedin
from src.models import GeneratedPost
import uuid
import re
from typing import List
from dotenv import load_dotenv
import logging
import os


def parse_posts(raw_output: str) -> List[dict]:
    """Parse the LLM output and split into individual posts."""
    posts = []

    # Split by --- or ## POST patterns
    sections = re.split(r'\n---\n|\n-{3,}\n', raw_output)

    for section in sections:
        section = section.strip()
        if not section:
            continue

        # Check if this section has a post header
        post_match = re.match(r'##\s*POST\s*\d+[:\s]*(.+?)(?:\n|$)', section, re.IGNORECASE)

        if post_match:
            title = post_match.group(1).strip()
            # Get content after the header
            content = section[post_match.end():].strip()
        else:
            # No header, use first line as title or generic
            lines = section.split('\n', 1)
            title = lines[0].strip()[:50] if lines[0].strip() else "Generated Post"
            content = lines[1].strip() if len(lines) > 1 else section

        # Skip if content is too short or just metadata
        if len(content) > 50:
            posts.append({
                "title": title,
                "content": content
            })

    return posts

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# Check for API Keys
if not os.getenv("ANTHROPIC_API_KEY"):
    logger.warning("ANTHROPIC_API_KEY is missing in .env file! Generation will fail.")
if not os.getenv("APIFY_API_KEY"):
    logger.warning("APIFY_API_KEY is missing in .env file! Scraping will fail.")
if not os.getenv("SIM_API_KEY"):
    logger.warning("SIM_API_KEY is missing in .env file! LinkedIn posting will fail.")

app = FastAPI(title="LinkedIn Automation Bot")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
post_queue: List[GeneratedPost] = []
approved_posts: List[GeneratedPost] = []

@app.get("/")
def health_check():
    return {"status": "running", "service": "LinkedIn Bot API"}

@app.post("/generate")
def generate_posts():
    """
    Triggers the agentic workflow to generate posts.
    """
    logger.info("Received generation request")
    try:
        crew = LinkedInCrew()
        result = crew.run()

        logger.info("Workflow completed successfully")

        # Parse the result into individual posts
        parsed_posts = parse_posts(str(result))
        new_ids = []

        if parsed_posts:
            for i, post_data in enumerate(parsed_posts):
                new_post = GeneratedPost(
                    id=str(uuid.uuid4()),
                    content=post_data["content"],
                    status="pending",
                    analysis_reference=post_data["title"]
                )
                post_queue.append(new_post)
                new_ids.append(new_post.id)
                logger.info(f"Created post {i+1}: {post_data['title'][:30]}...")
        else:
            # Fallback: store as single post if parsing fails
            new_post = GeneratedPost(
                id=str(uuid.uuid4()),
                content=str(result),
                status="pending",
                analysis_reference="Generated Post"
            )
            post_queue.append(new_post)
            new_ids.append(new_post.id)

        return {
            "message": f"Generated {len(new_ids)} posts",
            "post_count": len(new_ids),
            "queue_ids": new_ids
        }
    except Exception as e:
        logger.error(f"Error during generation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/queue", response_model=List[GeneratedPost])
def get_queue():
    """
    Get all pending posts.
    """
    return [p for p in post_queue if p.status == "pending"]

@app.post("/approve/{post_id}")
def approve_post(post_id: str):
    """
    Approve a post and publish to LinkedIn via SIM.ai.
    """
    for post in post_queue:
        if post.id == post_id:
            # Post to LinkedIn
            logger.info(f"Posting {post_id} to LinkedIn...")
            linkedin_result = post_to_linkedin(post.content)

            if "error" in linkedin_result:
                logger.error(f"LinkedIn posting failed: {linkedin_result}")
                raise HTTPException(status_code=500, detail=f"LinkedIn posting failed: {linkedin_result}")

            post.status = "posted"
            approved_posts.append(post)
            logger.info(f"Post {post_id} published to LinkedIn")
            return {
                "message": f"Post {post_id} published to LinkedIn!",
                "linkedin_response": linkedin_result
            }

    raise HTTPException(status_code=404, detail="Post not found")

@app.get("/approved", response_model=List[GeneratedPost])
def get_approved():
    """
    Get all approved posts.
    """
    return approved_posts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
