from pydantic import BaseModel
from datetime import datetime


class UserOut(BaseModel):
    id : int
    name: str
    email: str
    phone: str | None
    role : int
    created_at : datetime

class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None