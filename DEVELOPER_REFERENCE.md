## 🎯 Developer Quick Reference

### 🚀 Start Development

```bash
# Terminal 1: Backend
cd backend
python -m uvicorn app.main:app --reload
# Opens at http://localhost:8000
# Docs at http://localhost:8000/docs

# Terminal 2: Frontend
cd client
npm start
# Opens at http://localhost:3000
```

### 📁 File Guide - Where to Make Changes

| What to do | Go to file | Why |
|-----------|-----------|-----|
| Add new database field | `app/models/user.py` etc | Define table structure |
| Add validation rule | `app/schemas/user.py` etc | Validate API inputs |
| Add new API endpoint | `app/routers/jobs.py` etc | Define route |
| Add business logic | `app/services/job_service.py` etc | Implement functionality |
| Fix password issue | `app/utils/security.py` | All crypto here |
| Add new database table | `app/models/new.py` | Follow User.py pattern |
| Test API | http://localhost:8000/docs | Interactive API tester |

### 🔐 Authentication Flow

```
User Input
    ↓
Login Endpoint (auth.py)
    ↓
AuthService.login_user()
    ↓
SecurityUtils.verify_password()
    ↓
SecurityUtils.create_access_token()
    ↓
Return JWT Token
    ↓
Client stores in localStorage
    ↓
Pass token in query: ?token=JWT_TOKEN
```

### 🔄 Adding a New Feature (Step-by-Step)

**Example: Adding payment tracking**

1. **Create Model** (`app/models/payment.py`)
```python
class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    # ... other fields
```

2. **Create Schema** (`app/schemas/payment.py`)
```python
class PaymentCreate(BaseModel):
    worker_id: int
    amount: float
```

3. **Create Service** (`app/services/payment_service.py`)
```python
class PaymentService:
    @staticmethod
    def create_payment(db, payment_data):
        # Business logic here
        pass
```

4. **Create Router** (`app/routers/payments.py`)
```python
@router.post("/")
def create_payment(data: PaymentCreate, db=Depends(get_db), token=Query(None)):
    user_id = get_current_user_id(token)
    payment = PaymentService.create_payment(db, data)
    return payment
```

5. **Register Router** in `app/main.py`
```python
from app.routers import payments
app.include_router(payments.router)
```

Done! New feature is live.

### 🧪 Testing an Endpoint

**Method 1: Swagger UI** (Recommended)
- Go to http://localhost:8000/docs
- Click endpoint
- Fill in parameters
- Click "Try it out"
- See response

**Method 2: cURL**
```bash
curl -X GET "http://localhost:8000/api/v1/jobs?city=Mumbai"
```

**Method 3: Python**
```python
import requests
response = requests.get('http://localhost:8000/api/v1/jobs?city=Mumbai')
print(response.json())
```

### 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Port 8000 in use | `python -m uvicorn app.main:app --port 8001` |
| "Token required" error | Pass `?token=YOUR_JWT_TOKEN` in URL |
| Database locked | Delete `jobportal.db`, restart server |
| Import error | Make sure you're in `backend/` directory |
| CORS error | Frontend URL must be in `ALLOWED_ORIGINS` |
| Module not found | Run `pip install -r requirements.txt` |

### 📊 Database Queries Cheatsheet

Create:
```python
db.add(new_record)
db.commit()
```

Read:
```python
user = db.query(User).filter(User.email == email).first()
users = db.query(User).all()
```

Update:
```python
user.name = "New Name"
db.add(user)
db.commit()
```

Delete:
```python
db.delete(user)
db.commit()
```

### 🔍 Debug Tips

**Debug a user authentication issue:**
```python
# In auth_service.py, add print statements:
print(f"User found: {user}")
print(f"Password match: {password_match}")
```

**See actual SQL queries:**
```python
# In database.py, change to:
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=True  # ← Shows all SQL queries
)
```

**Test service directly:**
```python
from app.services.job_service import JobService
jobs = JobService.list_jobs(db, city="Mumbai")
print(jobs)
```

### 💻 VS Code Extensions (Recommended)

- Python
- Pylance
- FastAPI
- REST Client (to test APIs)
- SQLTools (for database GUI)

### 📝 Code Patterns Used

**Error Handling:**
```python
if not resource:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Resource not found"
    )
```

**Authorization:**
```python
if resource.owner_id != current_user_id:
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Access denied"
    )
```

**Pagination:**
```python
query = query.offset(skip).limit(limit)
```

### 🚀 Performance Tips

1. Always use `filter()` with indexes
2. Use pagination for large datasets
3. Cache frequently accessed data
4. Use database indexes on `email`, `city`
5. Collect all queries to `db.query()` before execution

### 🔐 Security Checklist

- [ ] Never hardcode secrets
- [ ] Use bcrypt for passwords (not MD5!)
- [ ] Validate all inputs (Pydantic does this)
- [ ] Check authorization before operations
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Never log passwords

### 📦 Production Deployment Command

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
```

### 🎯 Most Important File to Understand

👉 **`app/services/`** - This is where all business logic lives. Start here to understand how features work!

---

Happy coding! 🚀
