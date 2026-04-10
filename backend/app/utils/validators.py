"""
Validators for common operations
"""
import re
from typing import Optional


class Validators:
    """Validation utility class"""

    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    @staticmethod
    def validate_phone(phone: str) -> bool:
        """Validate phone number (basic check for Indian format)"""
        pattern = r'^[6-9]\d{9}$'
        return re.match(pattern, phone) is not None

    @staticmethod
    def validate_salary(salary: float) -> bool:
        """Validate salary amount"""
        return salary >= 0

    @staticmethod
    def validate_rating(rating: float) -> bool:
        """Validate rating (1-5)"""
        return 1 <= rating <= 5

    @staticmethod
    def validate_pagination(skip: int = 0, limit: int = 10) -> tuple:
        """Validate pagination parameters"""
        skip = max(0, skip)
        limit = min(100, max(1, limit))  # Max 100 items per page
        return skip, limit
