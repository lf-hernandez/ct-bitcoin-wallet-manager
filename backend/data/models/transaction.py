from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    hash = Column(String, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_modified_at = Column(DateTime(timezone=True), onupdate=func.now())
    raw_data = Column(JSON)
    bitcoin_address_id = Column(UUID(as_uuid=True), ForeignKey("bitcoin_addresses.id"))

    bitcoin_address = relationship("BitcoinAddress", back_populates="transactions")
