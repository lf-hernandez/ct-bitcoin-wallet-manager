from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert


from integrations.blockchain import client
from data import models


def create_transaction(hash: str, raw_data, bitcoin_addr: str, db: Session = None):

    db_transaction = models.Transaction(
        hash=hash, raw_data=raw_data, bitcoin_address_id=bitcoin_addr
    )
    db.add(db_transaction)
    db.commit()
    return db_transaction


def sync_transactions(bitcoin_addr: str, db: Session = None):
    bitcoin_address = (
        db.query(models.BitcoinAddress)
        .filter(models.BitcoinAddress.address == bitcoin_addr)
        .one_or_none()
    )

    if bitcoin_address is None:
        raise ValueError("Bitcoin address not found")

    data = client.get_address_info(bitcoin_addr)
    transactions = data["txs"]

    for tx in transactions:
        transaction_data = {
            "hash": tx["hash"],
            "raw_data": tx,
            "bitcoin_address_id": bitcoin_address.id,
        }

        stmt = insert(models.Transaction).values(**transaction_data)
        do_update_stmt = stmt.on_conflict_do_update(
            index_elements=["hash"], set_=transaction_data
        )
        db.execute(do_update_stmt)
        db.commit()


def get_transaction(hash: str, db: Session = None):
    return db.query(models.Transaction).filter_by(hash=hash).one_or_none()


def get_transactions(addr: str, skip: int = 0, limit: int = 10, db: Session = None):
    bitcoin_address = (
        db.query(models.BitcoinAddress)
        .filter(models.BitcoinAddress.address == addr)
        .first()
    )

    if not bitcoin_address:
        raise Exception("Invalid bitcoin address")

    db_transactions = (
        db.query(models.Transaction)
        .filter(models.Transaction.bitcoin_address_id == bitcoin_address.id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return db_transactions
