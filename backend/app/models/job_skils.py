from __future__ import annotations
from sqlalchemy.orm import Mapped,mapped_column
from sqlalchemy import Integer,ForeignKey
from app.database import Base

class Job_skills(Base):
	__tablename__ = "job_skills"
	id : Mapped[int] = mapped_column(autoincrement=True,primary_key=True)
	job_id : Mapped[int] = mapped_column(Integer,ForeignKey("job.id"))
	skill_id : Mapped[int] = mapped_column(Integer,ForeignKey("skills.id"))