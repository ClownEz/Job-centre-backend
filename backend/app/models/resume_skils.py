from __future__ import annotations
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Float,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
	from app.models.resume import Resume


class Resume_skils(Base):
	__tablename__ = "resume_skils"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	resume_id : Mapped[int] = mapped_column(Integer,ForeignKey("resume.id"))
	skill_id : Mapped[int] = mapped_column(Integer,ForeignKey("skills.id"))


	resume : Mapped["Resume"] = relationship(back_populates="resume_skils")