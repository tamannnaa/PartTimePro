"""
Application service
"""
from sqlalchemy.orm import Session
from app.models.application import Application
from app.models.job import Job
from app.models.user import User
from app.schemas.application import ApplicationCreate, ApplicationUpdate
from fastapi import HTTPException, status


class ApplicationService:
    """Service for job application operations"""

    @staticmethod
    def apply_for_job(db: Session, job_id: int, worker_id: int, app_data: ApplicationCreate) -> Application:
        """
        Submit a job application
        
        Args:
            db: Database session
            job_id: ID of job to apply for
            worker_id: ID of worker applying
            app_data: Application data
        
        Returns:
            Created Application object
        """
        # Verify job exists
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found"
            )

        # Check if already applied
        existing_app = db.query(Application).filter(
            and_(
                Application.job_id == job_id,
                Application.worker_id == worker_id
            )
        ).first()

        if existing_app:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already applied for this job"
            )

        new_application = Application(
            job_id=job_id,
            worker_id=worker_id,
            cover_letter=app_data.cover_letter
        )

        db.add(new_application)
        db.commit()
        db.refresh(new_application)

        return new_application

    @staticmethod
    def get_application(db: Session, app_id: int) -> Application:
        """Get application by ID"""
        app = db.query(Application).filter(Application.id == app_id).first()
        if not app:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Application not found"
            )
        return app

    @staticmethod
    def get_job_applications(db: Session, job_id: int, employer_id: int, skip: int = 0, limit: int = 10) -> list:
        """
        Get all applications for a job (employer only)
        
        Args:
            db: Database session
            job_id: Job ID
            employer_id: Employer ID (for authorization)
            skip: Pagination offset
            limit: Pagination limit
        
        Returns:
            List of applications
        """
        # Verify job belongs to employer
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job or job.employer_id != employer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )

        applications = db.query(Application).filter(
            Application.job_id == job_id
        ).offset(skip).limit(limit).all()

        return applications

    @staticmethod
    def get_worker_applications(db: Session, worker_id: int, skip: int = 0, limit: int = 10) -> list:
        """
        Get all applications submitted by a worker
        
        Args:
            db: Database session
            worker_id: Worker ID
            skip: Pagination offset
            limit: Pagination limit
        
        Returns:
            List of applications
        """
        applications = db.query(Application).filter(
            Application.worker_id == worker_id
        ).order_by(Application.applied_at.desc()).offset(skip).limit(limit).all()

        return applications

    @staticmethod
    def update_application_status(
        db: Session,
        app_id: int,
        employer_id: int,
        update_data: ApplicationUpdate
    ) -> Application:
        """
        Update application status (employer only)
        
        Args:
            db: Database session
            app_id: Application ID
            employer_id: Employer ID (for authorization)
            update_data: Update data with new status
        
        Returns:
            Updated Application object
        """
        application = ApplicationService.get_application(db, app_id)

        # Verify job belongs to employer
        job = db.query(Job).filter(Job.id == application.job_id).first()
        if not job or job.employer_id != employer_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )

        application.status = update_data.status
        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def get_stats(db: Session, employer_id: int) -> dict:
        """
        Get hiring statistics for an employer
        
        Args:
            db: Database session
            employer_id: Employer ID
        
        Returns:
            Dictionary with statistics
        """
        # Active jobs
        active_jobs = db.query(Job).filter(
            and_(Job.employer_id == employer_id, Job.is_active == "open")
        ).count()

        # Total applications
        total_applications = db.query(Application).filter(
            Application.job_id.in_(
                db.query(Job.id).filter(Job.employer_id == employer_id)
            )
        ).count()

        # Shortlisted applications
        shortlisted = db.query(Application).filter(
            and_(
                Application.job_id.in_(
                    db.query(Job.id).filter(Job.employer_id == employer_id)
                ),
                Application.status == "shortlisted"
            )
        ).count()

        # Hired
        hired = db.query(Application).filter(
            and_(
                Application.job_id.in_(
                    db.query(Job.id).filter(Job.employer_id == employer_id)
                ),
                Application.status == "accepted"
            )
        ).count()

        return {
            "active_jobs": active_jobs,
            "total_applications": total_applications,
            "shortlisted": shortlisted,
            "hired": hired
        }
