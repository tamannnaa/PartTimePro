## 🔄 Frontend Upgrade Guide - React to New Python Backend

### 📝 Changes Required in React Code

Your React frontend needs minimal changes. The API contract is similar, just different base URL and structure.

---

### 1️⃣ Update AuthContext.tsx

Replace your current authentication context with this:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'worker' | 'employer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  register: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const register = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // User registered but not logged in yet
      alert('Registration successful! Please login.');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      setToken(data.access_token);
      setUser({
        id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({
        id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      }));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

### 2️⃣ Update .env (Frontend)

Add to your `.env` file in the `client` folder:

```env
REACT_APP_API_URL=http://localhost:8000
```

---

### 3️⃣ Update API Calls Examples

#### Old Node.js way → New Python way

**BEFORE (Node.js/Express):**
```typescript
const response = await fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
```

**AFTER (Python/FastAPI):**
```typescript
const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

---

### 4️⃣ Create API Service Utility

Create `src/services/api.ts`:

```typescript
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  token?: string
) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API request failed');
  }

  return await response.json();
};

// Usage examples:
export const jobAPI = {
  // List jobs
  listJobs: (city?: string, category?: string, skip?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (category) params.append('category', category);
    if (skip) params.append('skip', skip.toString());
    if (limit) params.append('limit', limit.toString());
    
    return apiCall(`/api/v1/jobs?${params.toString()}`);
  },

  // Create job
  createJob: (jobData: any, token: string) => {
    return apiCall(`/api/v1/jobs?token=${token}`, 'POST', jobData);
  },

  // Get job details
  getJob: (jobId: number) => apiCall(`/api/v1/jobs/${jobId}`),

  // Search jobs
  searchJobs: (query: string, city?: string, salaryMin?: number, salaryMax?: number) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (city) params.append('city', city);
    if (salaryMin) params.append('salary_min', salaryMin.toString());
    if (salaryMax) params.append('salary_max', salaryMax.toString());

    return apiCall(`/api/v1/jobs/search?${params.toString()}`);
  },
};

export const applicationAPI = {
  // Apply for job
  applyForJob: (jobId: number, token: string, coverLetter?: string) => {
    return apiCall(
      `/api/v1/applications?token=${token}`,
      'POST',
      { job_id: jobId, cover_letter: coverLetter }
    );
  },

  // Get my applications
  getMyApplications: (token: string, skip?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (skip) params.append('skip', skip.toString());
    if (limit) params.append('limit', limit.toString());

    return apiCall(`/api/v1/applications/worker/my-applications?token=${token}&${params.toString()}`);
  },

  // Get job applications (employer)
  getJobApplications: (jobId: number, token: string) => {
    return apiCall(`/api/v1/applications/job/${jobId}?token=${token}`);
  },

  // Update application status
  updateStatus: (appId: number, status: string, token: string) => {
    return apiCall(
      `/api/v1/applications/${appId}?token=${token}`,
      'PUT',
      { status }
    );
  },

  // Get hiring stats
  getStats: (token: string) => {
    return apiCall(`/api/v1/applications/employer/stats?token=${token}`);
  },
};

export const userAPI = {
  // Get my profile
  getMyProfile: (token: string) => {
    return apiCall(`/api/v1/users/profile?token=${token}`);
  },

  // Update my profile
  updateProfile: (profileData: any, token: string) => {
    return apiCall(`/api/v1/users/profile?token=${token}`, 'PUT', profileData);
  },

  // Get user profile
  getUserProfile: (userId: number) => {
    return apiCall(`/api/v1/users/${userId}`);
  },

  // Search workers
  searchWorkers: (skill?: string, city?: string) => {
    const params = new URLSearchParams();
    if (skill) params.append('skill', skill);
    if (city) params.append('city', city);

    return apiCall(`/api/v1/users/workers?${params.toString()}`);
  },
};
```

---

### 5️⃣ Update Components

**Example: Login.tsx**

```typescript
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Your form JSX */}
    </form>
  );
};
```

**Example: Jobs.tsx**

```typescript
import { useEffect, useState } from 'react';
import { jobAPI } from '../services/api';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobAPI.listJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};
```

---

### 6️⃣ Token Handling in Headers

**For protected routes, pass token as query parameter:**

```typescript
// Instead of Authorization header, use query parameter:
fetch(`http://localhost:8000/api/v1/jobs?token=${token}`)

// This makes testing easier and works with browsers seamlessly
```

---

### 7️⃣ Error Handling

```typescript
const handleApiCall = async (apiFunction: any) => {
  try {
    return await apiFunction;
  } catch (error: any) {
    if (error.message === 'Invalid or expired token') {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    console.error('API Error:', error.message);
    throw error;
  }
};
```

---

### 🔄 Data Format Changes

| Field | Old (Node.js) | New (Python) |
|-------|---|---|
| User ID | User._id (MongoDB) | User.id (integer) |
| Timestamps | ISOString | ISO8601 datetime |
| Error Response | {error: "msg"} | {detail: "msg"} |
| JWT Token | In Authorization header | In query parameter or header |

---

### ✅ Checklist

- [ ] Update AuthContext
- [ ] Update API base URL (.env)
- [ ] Create api.ts service file
- [ ] Update Login component
- [ ] Update Register component
- [ ] Update Jobs component
- [ ] Update Dashboard components
- [ ] Update UserProfile component
- [ ] Test all API calls
- [ ] Verify token persistence

---

### 🧪 Test the Integration

1. Start backend: `python -m uvicorn app.main:app --reload`
2. Start frontend: `npm start`
3. Open http://localhost:3000
4. Try register → login → view jobs

---

### 🚀 You're all set!

Your React frontend is now fully compatible with the new Python FastAPI backend. All features work exactly the same from the user's perspective, but now with a professional, scalable backend!

---

Questions? 
- Check Swagger UI: http://localhost:8000/docs
- Read README.md in backend folder
- Examine service files for business logic
