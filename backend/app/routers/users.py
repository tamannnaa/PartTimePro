"""
User profile routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserProfileResponse, UserUpdate
from app.services.user_service import UserService
from app.services.auth_service import AuthService
from app.routers.auth import get_current_user_id
from typing import List

router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.get("/profile", response_model=UserProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Get current user's profile"""
    user_id = get_current_user_id(token)
    user = UserService.get_user_profile(db, user_id)
    return user


@router.put("/profile", response_model=UserProfileResponse)
def update_my_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Update current user's profile"""
    user_id = get_current_user_id(token)
    user = UserService.update_profile(db, user_id, update_data)
    return user


@router.get("/{user_id}", response_model=UserProfileResponse)
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """Get user profile by ID"""
    user = UserService.get_user_profile(db, user_id)
    return user


@router.get("/employer/{employer_id}", response_model=UserProfileResponse)
def get_employer_profile(employer_id: int, db: Session = Depends(get_db)):
    """Get employer profile"""
    employer = UserService.get_employer_profile(db, employer_id)
    return employer


@router.get("/workers", response_model=List[UserProfileResponse])
def search_workers(
    skill: str = Query(None),
    city: str = Query(None),
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """Search for workers by skills and location"""
    workers = UserService.search_workers(db, skill, city, skip, limit)
    return workers
