"""
Authentication routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, UserUpdate, UserProfileResponse
from app.services.auth_service import AuthService
from app.utils.security import SecurityUtils
from typing import Optional

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    user = AuthService.register_user(db, user_data)
    return user


@router.post("/login")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """Login user and get access token"""
    token_data = AuthService.login_user(db, login_data)
    return token_data


@router.post("/verify-token")
def verify_token(token: str):
    """Verify if a token is valid"""
    user_id = SecurityUtils.get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return {"valid": True, "user_id": user_id}


@router.post("/logout")
def logout():
    """Logout user (client-side token removal)"""
    return {"message": "Logged out successfully"}


def get_current_user_id(token: Optional[str] = None) -> int:
    """
    Dependency to extract user ID from JWT token in header
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token required"
        )

    # Remove 'Bearer ' prefix if present
    if token.startswith("Bearer "):
        token = token[7:]

    user_id = SecurityUtils.get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    return user_id
