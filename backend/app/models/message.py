from __future__ import annotations
from typing import Optional,TYPE_CHECKING
from datetime import datetime
from sqlalchemy import Integer,String,ForeignKey,Text,Boolean,DateTime,func
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.database import Base

class Message(Base):
	__tablename__ = "message"
	id : Mapped[int] = mapped_column(Integer,autoincrement=True,primary_key=True)
	sender_id : Mapped[int] = mapped_column(Integer,ForeignKey("user.id"))
	reciever_id : Mapped[int] = mapped_column(Integer,ForeignKey("user.id"))
	job_id : Mapped[int] = mapped_column(Integer,ForeignKey("job.id"))
	text : Mapped[Text] = mapped_column(Text)
	is_read : Mapped[bool] = mapped_column(Boolean,default=False)
	created_at : Mapped[datetime] = mapped_column(DateTime,server_default=func.now())