"""
Job schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class JobCreate(BaseModel):
    title: str
    description: str
    category: str
    salary: Optional[float] = None
    city: str
    job_type: str  # full-time, part-time, daily-wage
    requirements: Optional[str] = None
    experience_required: Optional[str] = None
    expires_at: Optional[datetime] = None


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    salary: Optional[float] = None
    city: Optional[str] = None
    job_type: Optional[str] = None
    requirements: Optional[str] = None
    is_active: Optional[str] = None


class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    salary: Optional[float] = None
    city: str
    employer_id: int
    job_type: str
    is_active: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JobListResponse(BaseModel):
    id: int
    title: str
    category: str
    city: str
    salary: Optional[float] = None
    job_type: str
    employer_id: int
    created_at: datetime

    class Config:
        from_attributes = True
