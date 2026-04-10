"""
Document schemas for validation
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentCreate(BaseModel):
    document_type: str
    title: str
    description: Optional[str] = None


class DocumentResponse(BaseModel):
    id: int
    user_id: int
    file_path: str
    document_type: str
    title: str
    is_verified: str
    uploaded_at: datetime

    class Config:
        from_attributes = True
