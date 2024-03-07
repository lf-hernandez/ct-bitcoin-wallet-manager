from pydantic import BaseModel


class BitcoinAddress(BaseModel):
    addr: str
