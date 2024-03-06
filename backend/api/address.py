from sqlalchemy.orm import Session

from integrations.blockchain import client
from data import models

def sync_address(addr: str, db: Session = None):
    data = client.get_address_info(addr)
    db_address = db.query(models.BitcoinAddress).filter_by(address=addr).first()

    if db_address:
        db_address.number_of_transactions = data['n_tx']
        db_address.total_received = data['total_received']
        db_address.total_sent = data['total_sent']
        db_address.balance = data["final_balance"]
        db_address.raw_data = data
        
        
    else:
        db_address = models.BitcoinAddress(
            address=addr,
            number_of_transactions = data['n_tx'],
            total_received = data['total_received'],
            total_sent = data['total_sent'],
            balance = data["final_balance"],
            raw_data=data,
        )
        db.add(db_address)

    db.commit()
    return db_address

def get_address(addr: str, db: Session = None):
    return db.query(models.BitcoinAddress).filter_by(address=addr).one_or_none()

def get_addresses(skip: int = 0, limit: int = 10, db: Session = None):
    db_addresses = db.query(models.BitcoinAddress).offset(skip).limit(limit).all()
    return db_addresses