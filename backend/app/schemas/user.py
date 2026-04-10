"""
User schemas for validation
"""
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional, List


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str  # job_seeker or employer
    phone: Optional[str] = None
    city: Optional[str] = None
    company_name: Optional[str] = None
    skills: Optional[str] = None

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v
    
    @field_validator("role")
    @classmethod
    def validate_role(cls, v):
        if v not in ["job_seeker", "employer"]:
            raise ValueError("Role must be either 'job_seeker' or 'employer'")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    skills: Optional[str] = None
    bio: Optional[str] = None
    company_name: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    phone: Optional[str]
    role: str
    city: Optional[str]
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UserProfileResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    role: str
    city: str
    skills: Optional[str] = None
    bio: Optional[str] = None
    company_name: Optional[str] = None
    profile_photo: Optional[str] = None
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
