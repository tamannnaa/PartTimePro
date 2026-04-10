# PartTimePro Backend - Python FastAPI

Professional, scalable backend for a job portal using Python, FastAPI, and SQLite.

## 🏗️ Project Architecture

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database setup & session management
│   ├── models/              # SQLAlchemy ORM models
│   ├── schemas/             # Pydantic request/response schemas
│   ├── routers/             # API endpoints
│   ├── services/            # Business logic layer
│   ├── utils/               # Utility functions
│   └── uploads/             # File storage
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variables template
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and update configuration as needed.

### 3. Run the Server
```bash
python -m uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📊 Database Schema

### Users Table
- **Purpose**: Store user information (workers, employers, admins)
- **Key Fields**: id, email, phone, role, skills, city, is_verified

### Jobs Table
- **Purpose**: Store job postings
- **Key Fields**: id, title, description, category, salary, city, employer_id, job_type

### Applications Table
- **Purpose**: Track job applications
- **Key Fields**: id, job_id, worker_id, status, applied_at

### Documents Table
- **Purpose**: Store uploaded documents (ID, certificates, photos)
- **Key Fields**: id, user_id, file_path, document_type

### Reviews Table
- **Purpose**: Store ratings and reviews
- **Key Fields**: id, worker_id, employer_id, rating, comment

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/verify-token` - Verify JWT token

### Jobs
- `GET /api/v1/jobs` - List all jobs
- `POST /api/v1/jobs` - Create job (employer only)
- `GET /api/v1/jobs/{job_id}` - Get job details
- `PUT /api/v1/jobs/{job_id}` - Update job
- `DELETE /api/v1/jobs/{job_id}` - Delete job
- `GET /api/v1/jobs/search` - Advanced search

### Applications
- `POST /api/v1/applications` - Apply for job
- `GET /api/v1/applications/worker/my-applications` - Get my applications
- `GET /api/v1/applications/job/{job_id}` - Get job applications (employer)
- `PUT /api/v1/applications/{app_id}` - Update application status

### Users
- `GET /api/v1/users/profile` - Get my profile
- `PUT /api/v1/users/profile` - Update my profile
- `GET /api/v1/users/{user_id}` - Get user profile
- `GET /api/v1/users/workers` - Search workers

## 🔄 Future Scalability

The system can be easily upgraded to use MySQL or PostgreSQL later:

```python
# Just change this in config.py
DATABASE_URL = "postgresql://user:password@localhost/jobportal"
# No other changes needed! SQLAlchemy handles the rest.
```

## 🛡️ Features

✅ JWT Authentication
✅ Role-based access (worker, employer, admin)
✅ Job search & filtering
✅ Application tracking
✅ User profiles
✅ Rating system
✅ Document management
✅ Pagination
✅ Error handling
✅ CORS support

## 📝 Example Usage

### Register

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"phone\": \"9876543210\",
    \"password\": \"securepass123\",
    \"role\": \"worker\",
    \"city\": \"Mumbai\",
    \"skills\": \"Python, Java, React\"
  }"
```

### Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"john@example.com\",
    \"password\": \"securepass123\"
  }"
```

### Create Job (as Employer)

```bash
curl -X POST "http://localhost:8000/api/v1/jobs?token=YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Senior Python Developer\",
    \"description\": \"Looking for experienced Python developer\",
    \"category\": \"IT\",
    \"salary\": 5000,
    \"city\": \"Bangalore\",
    \"job_type\": \"full-time\",
    \"requirements\": \"5+ years experience\"
  }"
```

## 🧪 Testing

```bash
pytest
```

## 📦 Deployment

### Using Gunicorn (Production)
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

### Using Docker
```bash
docker build -t parttimepro-backend .
docker run -p 8000:8000 parttimepro-backend
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using FastAPI + SQLAlchemy + SQLite**
