from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Float,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.education import Education
    from app.models.resume_skils import Resume_skils

class Resume(Base):
    __tablename__ = "resume"
    id:Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
    user_id : Mapped[int] = mapped_column(Integer,ForeignKey("user.id"))
    title : Mapped[str] = mapped_column(String(255))
    created_at : Mapped[datetime] = mapped_column(DateTime,server_default=func.now())
    summary : Mapped[str] = mapped_column(Text)
    desired_salary : Mapped[int | None] = mapped_column(Integer,nullable=True)

    education : Mapped[list["Education"]] = relationship(back_populates="resume")
    resume_skils : Mapped[list["Resume_skils"]] = relationship(back_populates="resume")
