# PartTimePro

A modern, full-stack job portal application designed for blue-collar and part-time workers. Connecting workers with local employers for gig, contract, and part-time opportunities.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

### For Workers
- 🔍 **Job Discovery** - Search & filter jobs by location, category, salary, and job type
- 📱 **Easy Applications** - Apply to jobs with a single click
- 📊 **Application Tracking** - Monitor all your job applications in one dashboard
- ⭐ **Ratings & Reviews** - Build your reputation with employer feedback
- 📄 **Document Management** - Upload ID, certificates, and portfolio documents
- 👤 **Professional Profile** - Showcase skills, experience, and availability
- 🔔 **Notifications** - Stay updated on application status and new opportunities

### For Employers
- 📝 **Job Posting** - Create and manage job listings with detailed descriptions
- 👥 **Applicant Management** - Review applications, view worker profiles, and hire
- ⭐ **Worker Ratings** - Rate and review worker performance after hiring
- 📊 **Dashboard** - Track posted jobs, applications, and hiring metrics
- 🔐 **Company Profile** - Build your employer brand and attract quality workers

### General Features
- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 🌍 **Location-Based Search** - Find opportunities in your area
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessible UI** - WCAG-compliant components
- 🚀 **Fast & Reliable** - Optimized performance and error handling

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Python 3.9+** - Programming language
- **FastAPI** - Modern async web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite/PostgreSQL** - Database
- **Pydantic** - Data validation
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **CORS** - Cross-origin resource sharing

### Tools & Services
- **Git** - Version control
- **npm/pip** - Package managers
- **Uvicorn** - ASGI server
- **Swagger/OpenAPI** - API documentation

---

## 📁 Project Structure

```
PartTimePro/
├── client/                          # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   ├── ApplicationManagement.tsx
│   │   │   ├── CreateJobForm.tsx
│   │   │   ├── EmployerDashboard.tsx
│   │   │   ├── Jobs.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── context/                # React Context for state
│   │   ├── lib/                    # Utilities and helpers
│   │   ├── App.tsx                 # Main app component
│   │   ├── config.ts               # Frontend configuration
│   │   └── index.tsx               # Entry point
│   ├── public/                      # Static files
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                         # Backend (FastAPI + Python)
│   ├── app/
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── config.py               # Configuration settings
│   │   ├── database.py             # Database setup
│   │   ├── models/                 # SQLAlchemy models
│   │   │   ├── user.py            # User model (workers, employers)
│   │   │   ├── job.py             # Job posting model
│   │   │   ├── application.py     # Job application model
│   │   │   ├── document.py        # Document/upload model
│   │   │   └── review.py          # Review/rating model
│   │   ├── schemas/                # Pydantic schemas for validation
│   │   ├── routers/                # API endpoint routes
│   │   │   ├── auth.py            # Authentication endpoints
│   │   │   ├── jobs.py            # Job endpoints
│   │   │   ├── applications.py    # Application endpoints
│   │   │   └── users.py           # User endpoints
│   │   ├── services/               # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   ├── job_service.py
│   │   │   ├── application_service.py
│   │   │   └── user_service.py
│   │   └── utils/                  # Utilities
│   │       ├── security.py        # JWT & password utilities
│   │       ├── validators.py      # Input validation
│   │       └── decorators.py      # Custom decorators
│   ├── requirements.txt
│   ├── .env.example
│   ├── SETUP_GUIDE.md
│   └── README.md
│
├── .gitignore                       # Git ignore file
├── DEVELOPER_REFERENCE.md           # Developer quick reference
├── FRONTEND_UPGRADE_GUIDE.md        # Frontend migration guide
├── MIGRATION_SUMMARY.md             # Backend migration summary
└── README.md                        # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** 14+ and **npm** (for frontend)
- **Python** 3.9+ and **pip** (for backend)
- **Git** for version control
- A code editor (VS Code recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/tamannnaa/PartTimePro.git
cd PartTimePro
```

### Step 2: Frontend Setup
```bash
cd client
npm install
```

Create a `.env.local` file in the `client/` directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Step 3: Backend Setup
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=sqlite:///./jobportal.db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 🏃 Running the Project

### Start Backend (Terminal 1)
```bash
cd backend

# Activate virtual environment
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

python -m uvicorn app.main:app --reload
```
- Backend running on: `http://localhost:8000`
- Swagger API docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Start Frontend (Terminal 2)
```bash
cd client
npm start
```
- Frontend running on: `http://localhost:3000`
- Application opens automatically in your browser

---

## 📚 API Documentation

The API is fully documented with Swagger/OpenAPI. Once the backend is running:

### Interactive API Docs
Visit `http://localhost:8000/docs` to:
- View all available endpoints
- See request/response schemas
- Test endpoints directly with the Swagger UI

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user (worker or employer)
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/refresh` - Refresh access token

#### Jobs
- `GET /api/jobs` - List all jobs with filters (location, category, salary)
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create new job (employers only)
- `PUT /api/jobs/{id}` - Update job (job owner only)
- `DELETE /api/jobs/{id}` - Delete job (job owner only)

#### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications` - Get user's applications
- `GET /api/applications/{id}` - Get application details
- `PUT /api/applications/{id}` - Update application status
- `DELETE /api/applications/{id}` - Cancel application

#### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/{id}` - Get user details
- `GET /api/users/search` - Search workers (employers only)
- `POST /api/users/reviews` - Leave a review

#### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents` - Get user's documents
- `DELETE /api/documents/{id}` - Delete document

---

## 🗄️ Database Schema

### Users Table
```sql
id | name | email | phone | role | city | skills | company_name | is_verified | created_at | updated_at
```
- **role**: 'worker' | 'employer'
- **skills**: Comma-separated list of worker skills

### Jobs Table
```sql
id | title | description | category | salary | city | job_type | employer_id | created_at | expires_at
```
- **job_type**: 'full-time' | 'part-time' | 'contract' | 'gig'
- **category**: 'construction' | 'cleaning' | 'delivery' | etc.

### Applications Table
```sql
id | job_id | worker_id | status | cover_letter | applied_at | updated_at
```
- **status**: 'pending' | 'accepted' | 'rejected' | 'withdrawn'

### Documents Table
```sql
id | user_id | document_type | file_url | uploaded_at
```
- **document_type**: 'id' | 'certificate' | 'portfolio'

### Reviews Table
```sql
id | reviewer_id | reviewee_id | rating | comment | created_at
```
- **rating**: 1-5 stars

---

## 👨‍💻 Development Guide

### Adding a New Feature

**Example: Adding payment/wage tracking**

1. **Create Model** (`backend/app/models/payment.py`)
```python
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
```

2. **Create Schema** (`backend/app/schemas/payment.py`)
```python
from pydantic import BaseModel

class PaymentCreate(BaseModel):
    worker_id: int
    amount: float

class PaymentResponse(BaseModel):
    id: int
    worker_id: int
    amount: float
    status: str
    
    class Config:
        from_attributes = True
```

3. **Create Service** (`backend/app/services/payment_service.py`)
```python
from app.models.payment import Payment

class PaymentService:
    @staticmethod
    def create_payment(db, payment_data):
        payment = Payment(**payment_data.dict())
        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment
```

4. **Create Router** (`backend/app/routers/payments.py`)
```python
from fastapi import APIRouter, Depends, Query
from app.schemas.payment import PaymentCreate
from app.services.payment_service import PaymentService
from app.database import get_db

router = APIRouter(prefix="/api/payments", tags=["payments"])

@router.post("/")
def create_payment(data: PaymentCreate, db=Depends(get_db), token=Query(None)):
    payment = PaymentService.create_payment(db, data)
    return payment
```

5. **Register Router** in `backend/app/main.py`
```python
from app.routers import payments
app.include_router(payments.router)
```

### Project Architecture

```
Request Flow:
User Input → Route Handler → Service Layer → Database → Response
```

- **Routes** (`routers/`): Handle HTTP requests and validation
- **Services** (`services/`): Contain business logic
- **Models** (`models/`): Define database structure
- **Schemas** (`schemas/`): Validate input/output data

---

## 🌐 Deployment

### Frontend Deployment (Vercel, Netlify)
```bash
cd client
npm run build
# Deploy the 'build' folder to Vercel/Netlify
```

### Backend Deployment (Heroku, Railway, AWS)

1. Update `DATABASE_URL` in `.env` to use PostgreSQL
2. Update `SECRET_KEY` in `.env` to a secure value
3. Deploy to your platform

**Example: Railway**
```bash
railway link
railway up
```

---

## 📝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Frontend: ESLint + Prettier
- Backend: PEP 8 (Black formatter)

### Before Submitting PR
- Test your changes thoroughly
- Update documentation if needed
- Ensure no console errors/warnings

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Support

Have questions or need help?

- 📖 Check [DEVELOPER_REFERENCE.md](DEVELOPER_REFERENCE.md) for quick development tips
- 🔧 See [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for technical details
- 📱 Create an [GitHub Issue](https://github.com/tamannnaa/PartTimePro/issues) for bugs

---

## 👥 Authors

- **Tamanna** - Project Creator & Lead Developer

---

## 🎯 Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced job matching algorithm
- [ ] Worker verification system
- [ ] Dispute resolution system
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

**Happy coding! 🚀**
