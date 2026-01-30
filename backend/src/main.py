from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.agents import LinkedInCrew, post_to_linkedin
from src.models import GeneratedPost
import uuid
from typing import List
from dotenv import load_dotenv
import logging
import os

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
    Triggers the CrewAI agentic workflow to generate posts.
    """
    logger.info("Received generation request")
    try:
        crew = LinkedInCrew()
        result = crew.run()
        
        logger.info("Workflow completed successfully")
        
        new_post = GeneratedPost(
            id=str(uuid.uuid4()),
            content=str(result),
            status="pending",
            analysis_reference="Full Run Analysis"
        )
        post_queue.append(new_post)
        
        return {"message": "Workflow completed", "result": result, "queue_id": new_post.id}
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
