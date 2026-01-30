from pydantic import BaseModel
from typing import List, Optional

class UserProfile(BaseModel):
    name: str
    title: str
    bio: str
    industry: str
    topics: List[str]
    tone: str

class Influencer(BaseModel):
    name: str
    handle: str
    follower_count: int
    profile_url: str

class LinkedInPost(BaseModel):
    author: str
    content: str
    likes: int
    comments: int
    date: str

class ContentAnalysis(BaseModel):
    top_performing_topics: List[str]
    posting_schedule_recommendation: str
    writing_style_tips: List[str]
    hook_structures: List[str]

class GeneratedPost(BaseModel):
    id: str
    content: str
    status: str = "pending" # pending, approved, posted
    analysis_reference: str
