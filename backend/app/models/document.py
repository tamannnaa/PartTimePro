"""
Document Model (for ID, certificates, photos - better for blue-collar workers)
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    file_path = Column(String(500), nullable=False)
    document_type = Column(String(50), nullable=False)  # ID, Certificate, Photo, License
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    is_verified = Column(String(20), default="pending")  # pending, verified, rejected
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    expired_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="documents")

    def __repr__(self):
        return f"<Document(id={self.id}, user_id={self.user_id}, type={self.document_type})>"
