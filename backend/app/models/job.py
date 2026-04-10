"""
Job Model
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    salary = Column(Float, nullable=True)
    city = Column(String(100), nullable=False, index=True)
    employer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    job_type = Column(String(50), nullable=False)  # full-time, part-time, daily-wage
    requirements = Column(Text, nullable=True)
    experience_required = Column(String(100), nullable=True)
    is_active = Column(String(20), default="open")  # open, closed, filled
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)

    # Relationships
    employer = relationship("User", back_populates="jobs", foreign_keys=[employer_id])
    applications = relationship("Application", back_populates="job", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Job(id={self.id}, title={self.title}, city={self.city})>"
