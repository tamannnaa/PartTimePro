"""
Review & Rating Model
"""
from sqlalchemy import Column, Integer, Float, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    employer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Float, nullable=False)  # 1-5
    comment = Column(Text, nullable=True)
    is_verified = Column(String(20), default="pending")  # pending, verified
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    worker = relationship(
        "User",
        back_populates="reviews_given",
        foreign_keys=[worker_id]
    )
    employer = relationship(
        "User",
        back_populates="reviews_received",
        foreign_keys=[employer_id]
    )

    def __repr__(self):
        return f"<Review(id={self.id}, worker_id={self.worker_id}, rating={self.rating})>"
