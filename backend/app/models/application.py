"""
Job Application Model
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    worker_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String(50), default="pending")  # pending, under_review, shortlisted, accepted, rejected
    cover_letter = Column(Text, nullable=True)
    applied_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    response_message = Column(Text, nullable=True)

    # Relationships
    job = relationship("Job", back_populates="applications")
    worker = relationship("User", back_populates="applications")

    def __repr__(self):
        return f"<Application(id={self.id}, job_id={self.job_id}, worker_id={self.worker_id})>"
