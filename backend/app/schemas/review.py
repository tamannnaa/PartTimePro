"""
Review schemas for validation
"""
from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional


class ReviewCreate(BaseModel):
    employer_id: int
    rating: float
    comment: Optional[str] = None

    @field_validator("rating")
    @classmethod
    def validate_rating(cls, v):
        if not (1 <= v <= 5):
            raise ValueError("Rating must be between 1 and 5")
        return v


class ReviewResponse(BaseModel):
    id: int
    worker_id: int
    employer_id: int
    rating: float
    comment: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
