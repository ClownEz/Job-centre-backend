from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Float,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

class WorkExp(Base):
    __tablename__ = "work_exp"
    id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
    resume_id : Mapped[int] = mapped_column(Integer,ForeignKey("resume.id"))
    company : Mapped[str] = mapped_column(String(255))
    position : Mapped[str] = mapped_column(String(40))
    start_date : Mapped[datetime] = mapped_column(DateTime)
    end_date : Mapped[datetime] = mapped_column(DateTime)
