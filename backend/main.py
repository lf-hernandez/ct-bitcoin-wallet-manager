from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from data.database import SessionLocal, engine, Base
from data import models

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "FastAPI is working!"}


@app.get("/addresses/")
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    addresses = db.query(models.BitcoinAddress).offset(skip).limit(limit).all()
    return addresses
