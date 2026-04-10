"""
Custom decorators and helpers
"""
from functools import wraps
from typing import Callable, Optional


def handle_exceptions(func: Callable):
    """Decorator to handle common exceptions"""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except Exception as e:
            # Log error appropriately
            raise
    return wrapper
