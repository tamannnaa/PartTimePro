"""
User service
"""
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserUpdate
from fastapi import HTTPException, status


class UserService:
    """Service for user operations"""

    @staticmethod
    def get_user_profile(db: Session, user_id: int) -> User:
        """Get user profile"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user

    @staticmethod
    def update_profile(db: Session, user_id: int, update_data: UserUpdate) -> User:
        """Update user profile"""
        user = UserService.get_user_profile(db, user_id)

        update_dict = update_data.dict(exclude_unset=True)
        for field, value in update_dict.items():
            if value is not None:
                setattr(user, field, value)

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def get_employer_profile(db: Session, employer_id: int) -> User:
        """Get employer profile"""
        employer = UserService.get_user_profile(db, employer_id)

        if employer.role != "employer":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not an employer"
            )

        return employer

    @staticmethod
    def get_worker_profile(db: Session, worker_id: int) -> User:
        """Get worker profile"""
        worker = UserService.get_user_profile(db, worker_id)

        if worker.role != "worker":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not a worker"
            )

        return worker

    @staticmethod
    def search_workers(db: Session, skill: str = None, city: str = None, skip: int = 0, limit: int = 10) -> list:
        """
        Search for workers by skills and location
        
        Args:
            db: Database session
            skill: Skill to search for
            city: City to filter by
            skip: Pagination offset
            limit: Pagination limit
        
        Returns:
            List of matching workers
        """
        query = db.query(User).filter(User.role == "worker")

        if skill:
            query = query.filter(User.skills.ilike(f"%{skill}%"))

        if city:
            query = query.filter(User.city.ilike(f"%{city}%"))

        workers = query.offset(skip).limit(limit).all()

        return workers
