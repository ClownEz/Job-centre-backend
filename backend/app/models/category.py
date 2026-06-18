from __future__ import annotations
from typing import Optional,TYPE_CHECKING

from sqlalchemy import Integer,String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

if TYPE_CHECKING :
	from app.models.skils import Skills

class Category(Base):
	__tablename__ = "category"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	name : Mapped[str] = mapped_column(String(255),unique=True)
	parent_id : Mapped[Optional[int]] = mapped_column(Integer,ForeignKey = ("category.id"),nullable=True)

	skills : Mapped[list["Skills"]] = relationship(back_populates="category")