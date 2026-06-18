from __future__ import annotations
from typing import Optional,TYPE_CHECKING

from datetime import datetime

from sqlalchemy import Integer,String,ForeignKey,Text,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

class Company_request(Base):
	__tablename__ = "company_request"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	user_id : Mapped[int] = mapped_column(Integer,ForeignKey("user.id"))
	company_name : Mapped[str] = mapped_column(String(225))
	description : Mapped[Text | None] = mapped_column(Text,nullable=True)
	industry : Mapped[str] = mapped_column(String(225))
	location : Mapped[str | None] = mapped_column(String(255),nullable=True)
	website : Mapped[str | None] = mapped_column(String(1200), nullable=True)
	phone : Mapped[str | None] = mapped_column(String(50),nullable=True)
	status : Mapped[str] = mapped_column(String(50),default="pending")
	created_at : Mapped[datetime] = mapped_column(DateTime,server_default=func.now())