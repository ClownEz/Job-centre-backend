from __future__ import annotations
from typing import Optional,TYPE_CHECKING

from sqlalchemy import Integer,String,ForeignKey,Text
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

if TYPE_CHECKING:
	from app.models.user import User

class Company(Base):
	__tablename__ = "company"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	name : Mapped[str] = mapped_column(String(255))
	user_id : Mapped[int] = mapped_column(Integer,ForeignKey("user.id"))
	description : Mapped[str] = mapped_column(Text)
	industry : Mapped[str] = mapped_column(String(255))
	location : Mapped[str | None] = mapped_column(String(255),nullable=True)
	phone : Mapped[str | None] = mapped_column(String(50),nullable=True)
	website : Mapped[str|None] = mapped_column(String(1200),nullable=True)


	user : Mapped["User"] = relationship(back_populates="companies")