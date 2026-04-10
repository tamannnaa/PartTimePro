"""
Application schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ApplicationCreate(BaseModel):
    job_id: int
    cover_letter: Optional[str] = None


class ApplicationUpdate(BaseModel):
    status: str


class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    worker_id: int
    status: str
    applied_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
