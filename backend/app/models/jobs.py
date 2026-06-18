from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Float,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

class Job(Base):
	__tablename__ = "job"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	name : Mapped[str] = mapped_column(String(255))
	company_id : Mapped[int]= mapped_column(Integer,ForeignKey("company.id"))
	category_id : Mapped[int] = mapped_column(Integer,ForeignKey("category.id"))
	description : Mapped[str] = mapped_column(Text)
	requirements : Mapped[str | None] = mapped_column(Text,nullable=True)
	salary_min : Mapped[int | None] = mapped_column(Integer,nullable=True)
	salary_max : Mapped[int | None] = mapped_column(Integer,nullable=True)
	posted_data : Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
	status : Mapped[str] = mapped_column(String(40))
	experience_level : Mapped[str] = mapped_column(String(150))
	location : Mapped[str | None] = mapped_column(String(255), nullable=True)