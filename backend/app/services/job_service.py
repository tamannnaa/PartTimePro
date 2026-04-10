"""
Job service
"""
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app.models.job import Job
from app.models.user import User
from app.schemas.job import JobCreate, JobUpdate
from fastapi import HTTPException, status
from datetime import datetime


class JobService:
    """Service for job operations"""

    @staticmethod
    def create_job(db: Session, job_data: JobCreate, employer_id: int) -> Job:
        """
        Create a new job posting
        
        Args:
            db: Database session
            job_data: Job creation data
            employer_id: ID of employer posting the job
        
        Returns:
            Created Job object
        """
        # Verify employer exists
        employer = db.query(User).filter(User.id == employer_id).first()
        if not employer or employer.role != "employer":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only employers can post jobs"
            )

        new_job = Job(
            title=job_data.title,
            description=job_data.description,
            category=job_data.category,
            salary=job_data.salary,
            city=job_data.city,
            employer_id=employer_id,
            job_type=job_data.job_type,
            requirements=job_data.requirements,
            experience_required=job_data.experience_required,
            expires_at=job_data.expires_at
        )

        db.add(new_job)
        db.commit()
        db.refresh(new_job)

        return new_job

    @staticmethod
    def get_job_by_id(db: Session, job_id: int) -> Job:
        """Get job by ID"""
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )
        return job

    @staticmethod
    def list_jobs(
        db: Session,
        city: str = None,
        category: str = None,
        job_type: str = None,
        skip: int = 0,
        limit: int = 10
    ) -> list:
        """
        List jobs with optional filters
        
        Args:
            db: Database session
            city: Filter by city
            category: Filter by category
            job_type: Filter by job type
            skip: Pagination offset
            limit: Pagination limit
        
        Returns:
            List of jobs
        """
        query = db.query(Job).filter(Job.is_active == "open")

        if city:
            query = query.filter(Job.city.ilike(f"%{city}%"))

        if category:
            query = query.filter(Job.category.ilike(f"%{category}%"))

        if job_type:
            query = query.filter(Job.job_type == job_type)

        # Order by newest first
        jobs = query.order_by(Job.created_at.desc()).offset(skip).limit(limit).all()

        return jobs

    @staticmethod
    def get_employer_jobs(db: Session, employer_id: int, skip: int = 0, limit: int = 10) -> list:
        """Get all jobs posted by an employer"""
        jobs = db.query(Job).filter(Job.employer_id == employer_id).offset(skip).limit(limit).all()
        return jobs

    @staticmethod
    def update_job(db: Session, job_id: int, employer_id: int, update_data: JobUpdate) -> Job:
        """Update job posting"""
        job = JobService.get_job_by_id(db, job_id)

        # Verify ownership
        if job.employer_id != employer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own jobs"
            )

        # Update allowed fields
        update_dict = update_data.dict(exclude_unset=True)
        for field, value in update_dict.items():
            if value is not None:
                setattr(job, field, value)

        db.add(job)
        db.commit()
        db.refresh(job)

        return job

    @staticmethod
    def delete_job(db: Session, job_id: int, employer_id: int) -> bool:
        """Delete job posting"""
        job = JobService.get_job_by_id(db, job_id)

        # Verify ownership
        if job.employer_id != employer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own jobs"
            )

        db.delete(job)
        db.commit()

        return True

    @staticmethod
    def search_jobs(
        db: Session,
        query_string: str = None,
        city: str = None,
        salary_min: float = None,
        salary_max: float = None,
        skip: int = 0,
        limit: int = 10
    ) -> list:
        """
        Advanced job search
        
        Args:
            db: Database session
            query_string: Search in title and description
            city: Filter by city
            salary_min: Minimum salary
            salary_max: Maximum salary
            skip: Pagination offset
            limit: Pagination limit
        
        Returns:
            List of matching jobs
        """
        query = db.query(Job).filter(Job.is_active == "open")

        if query_string:
            search_term = f"%{query_string}%"
            query = query.filter(
                or_(Job.title.ilike(search_term), Job.description.ilike(search_term))
            )

        if city:
            query = query.filter(Job.city.ilike(f"%{city}%"))

        if salary_min is not None:
            query = query.filter(Job.salary >= salary_min)

        if salary_max is not None:
            query = query.filter(Job.salary <= salary_max)

        jobs = query.order_by(Job.created_at.desc()).offset(skip).limit(limit).all()

        return jobs
