"""
User Model
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="job_seeker")  # job_seeker or employer
    city = Column(String(100), nullable=True)
    skills = Column(Text, nullable=True)  # Comma-separated skills for workers
    profile_photo = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    company_name = Column(String(255), nullable=True)  # For employers
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    jobs = relationship("Job", back_populates="employer", foreign_keys="Job.employer_id")
    applications = relationship("Application", back_populates="worker")
    documents = relationship("Document", back_populates="user")
    reviews_received = relationship(
        "Review",
        back_populates="employer",
        foreign_keys="Review.employer_id"
    )
    reviews_given = relationship(
        "Review",
        back_populates="worker",
        foreign_keys="Review.worker_id"
    )

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
