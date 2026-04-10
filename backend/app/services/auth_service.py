"""
Authentication service
"""
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.security import SecurityUtils
from app.utils.validators import Validators
from fastapi import HTTPException, status


class AuthService:
    """Service for authentication operations"""

    @staticmethod
    def register_user(db: Session, user_data: UserCreate) -> User:
        """
        Register a new user
        
        Args:
            db: Database session
            user_data: User registration data
        
        Returns:
            Created User object
        
        Raises:
            HTTPException: If email or username already exists
        """
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Check if username already exists
        existing_username = db.query(User).filter(User.username == user_data.username).first()
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )

        # Validate phone number if provided
        if user_data.phone and not Validators.validate_phone(user_data.phone):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phone number format"
            )

        # Hash password
        hashed_password = SecurityUtils.hash_password(user_data.password)

        # Create new user
        new_user = User(
            username=user_data.username,
            email=user_data.email,
            phone=user_data.phone,
            password_hash=hashed_password,
            role=user_data.role,
            city=user_data.city,
            skills=user_data.skills,
            company_name=user_data.company_name if user_data.role == "employer" else None
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    def login_user(db: Session, login_data: UserLogin) -> dict:
        """
        Authenticate user and return token
        
        Args:
            db: Database session
            login_data: Login credentials
        
        Returns:
            Dictionary with access_token, token_type, and user info
        
        Raises:
            HTTPException: If credentials are invalid
        """
        # Find user by email
        user = db.query(User).filter(User.email == login_data.email).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Verify password
        if not SecurityUtils.verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive"
            )

        # Create access token
        access_token = SecurityUtils.create_access_token(data={"sub": str(user.id)})

        return {
            "token": access_token,
            "user": {
                "_id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        """Get user by ID"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user

    @staticmethod
    def update_user(db: Session, user_id: int, update_data: dict) -> User:
        """Update user information"""
        user = AuthService.get_user_by_id(db, user_id)

        # Update allowed fields
        for field, value in update_data.items():
            if value is not None and hasattr(user, field):
                setattr(user, field, value)

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
