import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token for authentication
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        // Only clear local data after successful server logout
        await response.json();
        logout(); // Context cleanup
        localStorage.clear(); // Clear all local storage data
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
        // You might want to show this error to the user via a toast/alert
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      disabled={isLoading}
      className="transition-all duration-300 border border-red-500 text-red-500 bg-white hover:bg-red-50 disabled:opacity-50"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  );
};

export default LogoutButton