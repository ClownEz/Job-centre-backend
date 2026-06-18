from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Float,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

class Aplications(Base):
    __tablename__ = "application"
    id : Mapped[int] = mapped_column(autoincrement=True,primary_key=True)
    job_id : Mapped[int] = mapped_column(Integer,ForeignKey("job.id"))
    resume_id : Mapped[int | None] = mapped_column(Integer,ForeignKey("resume.id"),nullable=True,)
    letter : Mapped[str] = mapped_column(Text)
    status : Mapped[str] = mapped_column(String(50),default="pending")
    applicant_name : Mapped[str] = mapped_column(String(255))
    email : Mapped[str] = mapped_column(String(255))
    phone : Mapped[str] = mapped_column(String(50))
    cover_letter : Mapped[Text] = mapped_column(Text,nullable=True)