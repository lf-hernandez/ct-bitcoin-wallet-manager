from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy import Column, Text, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base


class BitcoinAddress(Base):
    __tablename__ = "bitcoin_addresses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    address = Column(Text, unique=True)
    number_of_transactions = Column(Integer)
    total_received = Column(Integer)
    total_sent = Column(Integer)
    balance = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_modified_at = Column(DateTime(timezone=True), onupdate=func.now())
    raw_data = Column(JSON)

    transactions = relationship("Transaction", back_populates="bitcoin_address")
