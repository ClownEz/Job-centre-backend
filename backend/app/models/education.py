from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
	from app.models.resume import Resume

class Education(Base):
	__tablename__ = "education"
	id : Mapped[int] = mapped_column(autoincrement=True,primary_key=True)
	resume_id : Mapped[int] = mapped_column(Integer,ForeignKey("resume.id"))
	institution : Mapped[str | None] = mapped_column(String(400),nullable=True)
	degree : Mapped[str] = mapped_column(String(400))
	graduation_year : Mapped[int] = mapped_column(Integer)
	resume : Mapped["Resume"] = relationship(back_populates="education")
