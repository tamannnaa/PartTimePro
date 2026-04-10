"""
Job routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.job import JobCreate, JobResponse, JobUpdate, JobListResponse
from app.services.job_service import JobService
from app.routers.auth import get_current_user_id
from typing import List, Optional

router = APIRouter(prefix="/api/v1/jobs", tags=["jobs"])


@router.post("", response_model=JobResponse)
def create_job(
    job_data: JobCreate,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Create a new job posting (employer only)"""
    employer_id = get_current_user_id(token)
    job = JobService.create_job(db, job_data, employer_id)
    return job


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    """Get job details"""
    job = JobService.get_job_by_id(db, job_id)
    return job


@router.get("", response_model=List[JobListResponse])
def list_jobs(
    city: str = Query(None),
    category: str = Query(None),
    job_type: str = Query(None),
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """List all available jobs with optional filters"""
    jobs = JobService.list_jobs(db, city, category, job_type, skip, limit)
    return jobs


@router.get("/employer/my-jobs", response_model=List[JobResponse])
def get_my_jobs(
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Get jobs posted by current employer"""
    employer_id = get_current_user_id(token)
    jobs = JobService.get_employer_jobs(db, employer_id, skip, limit)
    return jobs


@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int,
    update_data: JobUpdate,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Update job posting"""
    employer_id = get_current_user_id(token)
    job = JobService.update_job(db, job_id, employer_id, update_data)
    return job


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    token: str = Query(None, alias="token")
):
    """Delete job posting"""
    employer_id = get_current_user_id(token)
    JobService.delete_job(db, job_id, employer_id)
    return {"message": "Job deleted successfully"}


@router.get("/search", response_model=List[JobListResponse])
def search_jobs(
    query: str = Query(None),
    city: str = Query(None),
    salary_min: float = Query(None),
    salary_max: float = Query(None),
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """Advanced job search"""
    jobs = JobService.search_jobs(db, query, city, salary_min, salary_max, skip, limit)
    return jobs
