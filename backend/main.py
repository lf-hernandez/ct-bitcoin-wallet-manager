from http.client import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from pydantic import BaseModel

from data.database import SessionLocal, engine, Base
from api.address import sync_address, get_addresses, get_address
from api.address import create_address
from api.transaction import get_transactions
from api.transaction import sync_transactions

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

from pydantic import BaseModel


class BitcoinAddress(BaseModel):
    addr: str    

@app.get("/")
def read_root():
    return {"message": "FastAPI is working!"}


@app.get("/addresses/")
def get_bitcoin_addresses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    db_addresses = get_addresses(skip, limit, db)
    return db_addresses

@app.get("/addresses/sync/")
def sync_bitcoin_address(skip: int = 0, limit: int = 10,db: Session = Depends(get_db)):
    db_addresses = get_addresses(skip, limit, db)
    for address in db_addresses:
        sync_address(address.address, db)

@app.get("/transactions/")
def get_address_transactions(addr: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    db_transactions = get_transactions(addr, skip, limit, db)
    return db_transactions
    
@app.get("/transactions/sync/{addr}")
def sync_address_transactions(addr: str, db: Session = Depends(get_db)):
    sync_transactions(addr, db)
    
@app.get("/address/{addr}")
def get_bitcoin_address(addr: str, db: Session = Depends(get_db)):
    db_bitcoin_address = get_address(addr, db)
    if db_bitcoin_address is None:
        raise HTTPException(status_code=404, detail="Address not found")
    return db_bitcoin_address

@app.post("/address/")
def create_bitcoin_address(bitcoinAddressInput: BitcoinAddress, db: Session = Depends(get_db)):
    
    if not bitcoinAddressInput:
        raise HTTPException(status_code=400, detail="Address not provided")
    db_bitcoin_address = create_address(bitcoinAddressInput.addr, db)
    return db_bitcoin_address

@app.get("/address/sync/{addr}")
def sync_bitcoin_address(addr: str, db: Session = Depends(get_db)):
    sync_address(addr, db)
    

@app.get("/transaction/{addr}")
def get_bitcoin_address(addr: str, db: Session = Depends(get_db)):
    db_bitcoin_address = get_address(addr, db)
    if db_bitcoin_address is None:
        raise HTTPException(status_code=404, detail="Address not found")
    return db_bitcoin_address


