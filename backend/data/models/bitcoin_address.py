from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String

from ..database import Base


class BitcoinAddress(Base):
    __tablename__ = "bitcoin_address"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    address = Column(String, unique=True)
