## 🚀 Getting Started with the New Python FastAPI Backend

### ✅ What's been created:

Your backend has been completely migrated from Node.js/Express to Python/FastAPI with a professional, scalable architecture:

```
backend/
├── app/
│   ├── main.py                    # FastAPI application entry point
│   ├── config.py                  # Configuration settings
│   ├── database.py                # SQLAlchemy setup
│   ├── models/                    # Database models (5 fully designed)
│   │   ├── user.py               # Users (workers, employers)
│   │   ├── job.py                # Job postings
│   │   ├── application.py        # Job applications
│   │   ├── document.py           # Uploaded documents (ID, certs)
│   │   └── review.py             # Ratings & reviews
│   ├── schemas/                   # Pydantic validation schemas
│   ├── routers/                   # API endpoints
│   │   ├── auth.py               # Auth endpoints
│   │   ├── jobs.py               # Job endpoints
│   │   ├── applications.py       # Application endpoints
│   │   └── users.py              # User endpoints
│   ├── services/                  # Business logic layer
│   │   ├── auth_service.py
│   │   ├── job_service.py
│   │   ├── application_service.py
│   │   └── user_service.py
│   └── utils/                     # Utilities
│       ├── security.py           # JWT & password hashing
│       ├── validators.py         # Input validation
│       └── decorators.py         # Custom decorators
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment template
└── README.md                     # Full documentation
```

---

### 📋 Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**What gets installed:**
- ✅ **FastAPI** - Modern async web framework
- ✅ **SQLAlchemy** - ORM for database
- ✅ **SQLite** - Local database (zero configuration)
- ✅ **Pydantic** - Data validation
- ✅ **JWT** - Secure authentication
- ✅ **Uvicorn** - ASGI server

---

### 🔧 Step 2: Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and update if needed (defaults are fine for development):

```env
DATABASE_URL=sqlite:///./jobportal.db
SECRET_KEY=your-secret-key-change-in-production
ALLOWED_ORIGINS=http://localhost:3000
```

---

### 🏃 Step 3: Run the Server

```bash
python -m uvicorn app.main:app --reload
```

**Server will start at:** `http://localhost:8000`

**Available at:**
- 📚 **API Docs**: http://localhost:8000/docs (Swagger UI)
- 📖 **ReDoc**: http://localhost:8000/redoc
- ❤️ **Health Check**: http://localhost:8000/health

---

### 📊 Database Schema (Automatic Creation)

Run the server once and the SQLite database (`jobportal.db`) is **automatically created** with all tables:

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | Workers, employers, admins | id, email, phone, role, skills, city |
| **jobs** | Job postings | id, title, category, salary, employer_id |
| **applications** | Track who applied for what | id, job_id, worker_id, status |
| **documents** | IDs, certs, photos (blue-collar friendly) | id, user_id, document_type |
| **reviews** | Ratings between workers & employers | id, worker_id, employer_id, rating |

**Why This Design is Perfect:**
- ✅ Supports blue-collar workers (phone + skills > resume)
- ✅ Flexible document storage
- ✅ 2-way ratings (builds trust)
- ✅ Location-based search ready
- ✅ Application tracking

---

### 🔑 API Endpoints (Quick Reference)

#### Authentication
```bash
POST /api/v1/auth/register          # Register user
POST /api/v1/auth/login             # Login & get JWT token
POST /api/v1/auth/verify-token      # Verify token validity
```

#### Jobs
```bash
GET  /api/v1/jobs                   # List all jobs (with filters)
POST /api/v1/jobs?token=XXX         # Create job (employer only)
GET  /api/v1/jobs/{job_id}          # Get job details
PUT  /api/v1/jobs/{job_id}          # Update job (owner only)
DELETE /api/v1/jobs/{job_id}        # Delete job (owner only)
GET  /api/v1/jobs/search            # Advanced search
```

#### Applications
```bash
POST /api/v1/applications?token=XXX                  # Apply for job
GET  /api/v1/applications/worker/my-applications     # My applications
GET  /api/v1/applications/job/{job_id}?token=XXX     # Job applications (employer)
PUT  /api/v1/applications/{app_id}?token=XXX         # Update status (employer)
GET  /api/v1/applications/employer/stats             # Hiring stats (employer)
```

#### Users
```bash
GET  /api/v1/users/profile?token=XXX         # My profile
PUT  /api/v1/users/profile?token=XXX         # Update my profile
GET  /api/v1/users/{user_id}                 # Get user profile
GET  /api/v1/users/workers                   # Search workers
```

---

### 💻 Example: Register & Login

**1. Register a new user:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Developer",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "SecurePass123",
    "role": "worker",
    "city": "Bangalore",
    "skills": "Python, Django, REST APIs"
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "John Developer",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "worker",
  "city": "Bangalore",
  "is_verified": false,
  "created_at": "2026-02-27T10:30:00.000Z"
}
```

**2. Login:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "username": "John Developer",
  "email": "john@example.com",
  "role": "worker"
}
```

**3. Use token for protected routes:**
```bash
curl "http://localhost:8000/api/v1/users/profile?token=YOUR_JWT_TOKEN"
```

---

### 🎯 Key Design Features

#### 1. **Clean Architecture** 🏗️
```
Request → Router → Service → Database
           ↓
         Validation (Pydantic)
         Authorization (JWT)
         Error Handling
```

#### 2. **Separation of Concerns**
- **Models** - Database structure
- **Schemas** - Request/response validation
- **Services** - Business logic (no DB queries in routes)
- **Routers** - API endpoints only
- **Utils** - Reusable functions

#### 3. **Why This Structure Matters**
✅ Easy to test (services are independent)
✅ Easy to scale (add new models/services without changing routes)
✅ Easy to maintain (changes in one place only)
✅ Professional (industry standard)
✅ Interview-ready (shows architectural knowledge)

---

### 🔄 Future Database Migration (Zero Effort)

**The BEST part:** Switch from SQLite to PostgreSQL/MySQL in **10 minutes**:

```python
# In config.py, just change this line:
DATABASE_URL = "postgresql://user:password@localhost:5432/jobportal"
# Or for MySQL:
DATABASE_URL = "mysql://user:password@localhost:3306/jobportal"

# Everything else works exactly the same!
# SQLAlchemy handles all database differences
```

**In interviews, you can say:** *"Our system uses SQLite for development but is designed with SQLAlchemy ORM to support enterprise databases like PostgreSQL/MySQL without any architectural changes."*

---

### 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

---

### 📦 Production Deployment

#### Using Gunicorn + Uvicorn:
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
```

#### Using Docker:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]
```

---

### 🔐 Security Features

✅ **Password Hashing**: bcrypt (industry standard)
✅ **JWT Tokens**: Secure authentication
✅ **Email Validation**: Pydantic built-in
✅ **Phone Validation**: Regex for Indian format
✅ **CORS**: Protected endpoints
✅ **Role-based Access**: Worker vs Employer vs Admin

---

### 🎨 Update Your Frontend (React)

The auth endpoint works the same way. Update your `AuthContext.tsx`:

```typescript
const loginUser = async (email: string, password: string) => {
  const response = await fetch('http://localhost:8000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  setAuthData({
    token: data.access_token,
    user: { id: data.user_id, username: data.username, role: data.role }
  });
};
```

---

### 📞 Troubleshooting

**Port 8000 already in use?**
```bash
python -m uvicorn app.main:app --reload --port 8001
```

**Database errors?**
```bash
# Delete old database and recreate
rm backend/jobportal.db
# Run server again - new database is created automatically
```

**ModuleNotFoundError?**
```bash
# Make sure you're in the backend directory
cd backend
pip install -r requirements.txt
```

---

### 🎓 Learning Path

1. ✅ Start the server - explore `/docs`
2. ✅ Try sample API calls (see examples above)
3. ✅ Update React frontend to use new API
4. ✅ Read through service files to understand business logic
5. ✅ Add new features by creating new services + routers
6. ✅ Deploy to production

---

### 📚 What's Next?

- [ ] Add file upload for documents
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add search filters & pagination
- [ ] Add notification system
- [ ] Add real-time chat
- [ ] Deploy to cloud (Heroku, AWS, Azure)

---

**Congratulations! You now have a professional, industry-grade backend! 🚀**

Questions? Check:
- **Swagger UI**: http://localhost:8000/docs
- **Full README**: backend/README.md
- **Source Code**: Explore each file with comments

---

Built with ❤️ using **FastAPI + SQLAlchemy + SQLite**
