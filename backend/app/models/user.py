from __future__ import annotations
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Integer, DateTime, func,String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

if TYPE_CHECKING:
	from app.models.company import Company

class User(Base):
	__tablename__ = "user"
	id : Mapped[int] = mapped_column(primary_key = True , autoincrement= True)
	name : Mapped[str] = mapped_column(String(255))
	email : Mapped[str] = mapped_column(String(255),unique=True)
	phone : Mapped[str | None] = mapped_column(String(15),nullable=True)
	password_hash : Mapped[str] = mapped_column(String(255))
	role : Mapped[int] = mapped_column(Integer,default=0)
	created_at : Mapped[datetime] = mapped_column(DateTime,server_default=func.now())

	companies : Mapped[list["Company"]] = relationship(back_populates="user")