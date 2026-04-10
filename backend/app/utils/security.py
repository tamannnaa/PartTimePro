"""
Security utilities: JWT, password hashing, token management
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


class SecurityUtils:
    """Utility class for security operations"""

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using bcrypt
        
        Note: Bcrypt has a 72-byte limit, so we truncate if necessary
        """
        # Ensure password doesn't exceed bcrypt's 72-byte limit
        password_bytes = password.encode()[:72]
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password_bytes, salt)
        return hashed.decode('utf-8')

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hashed password
        
        Note: Truncate to match bcrypt's 72-byte limit
        """
        # Truncate to match the hashing process
        password_bytes = plain_password.encode()[:72]
        hashed_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_bytes)

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """
        Create a JWT access token
        
        Args:
            data: Dictionary containing token claims (e.g., {"sub": user_id})
            expires_delta: Optional expiration time delta
        
        Returns:
            Encoded JWT token
        """
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @staticmethod
    def decode_token(token: str) -> Optional[dict]:
        """
        Decode a JWT token
        
        Args:
            token: JWT token string
        
        Returns:
            Dictionary with token data or None if invalid
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            return None

    @staticmethod
    def get_user_id_from_token(token: str) -> Optional[int]:
        """Extract user ID from JWT token"""
        payload = SecurityUtils.decode_token(token)
        if payload and "sub" in payload:
            try:
                return int(payload.get("sub"))
            except (ValueError, TypeError):
                return None
        return None
