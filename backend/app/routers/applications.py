"""
Job Application routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.application import ApplicationCreate, ApplicationResponse, ApplicationUpdate
from app.services.application_service import ApplicationService
from app.routers.auth import get_current_user_id
from typing import List

router = APIRouter(prefix="/api/v1/applications", tags=["applications"])


@router.post("", response_model=ApplicationResponse)
def apply_for_job(
    app_data: ApplicationCreate,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Submit a job application"""
    worker_id = get_current_user_id(token)
    application = ApplicationService.apply_for_job(db, app_data.job_id, worker_id, app_data)
    return application


@router.get("/{app_id}", response_model=ApplicationResponse)
def get_application(app_id: int, db: Session = Depends(get_db)):
    """Get application details"""
    application = ApplicationService.get_application(db, app_id)
    return application


@router.get("/job/{job_id}", response_model=List[ApplicationResponse])
def get_job_applications(
    job_id: int,
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Get all applications for a job (employer only)"""
    employer_id = get_current_user_id(token)
    applications = ApplicationService.get_job_applications(db, job_id, employer_id, skip, limit)
    return applications


@router.get("/worker/my-applications", response_model=List[ApplicationResponse])
def get_my_applications(
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Get all applications submitted by current worker"""
    worker_id = get_current_user_id(token)
    applications = ApplicationService.get_worker_applications(db, worker_id, skip, limit)
    return applications


@router.put("/{app_id}", response_model=ApplicationResponse)
def update_application_status(
    app_id: int,
    update_data: ApplicationUpdate,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Update application status (employer only)"""
    employer_id = get_current_user_id(token)
    application = ApplicationService.update_application_status(db, app_id, employer_id, update_data)
    return application


@router.get("/employer/stats")
def get_hiring_stats(
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Get hiring statistics for employer"""
    employer_id = get_current_user_id(token)
    stats = ApplicationService.get_stats(db, employer_id)
    return stats
