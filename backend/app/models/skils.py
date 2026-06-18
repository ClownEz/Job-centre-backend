from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import Integer,String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

if TYPE_CHECKING:
	from app.models.category import Category

class Skills(Base):
	__tablename__ = "skills"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	name : Mapped[str] = mapped_column(String(255))
	category_id : Mapped[int] = mapped_column(Integer,ForeignKey("category.id"))

	category : Mapped["Category"] = relationship(back_populates="skills")
