from pydantic import BaseModel
from datetime import datetime


class MessageSend(BaseModel):
	reciever_id : int
	text : str
	job_id : int

class MessageOut(BaseModel):
	id : int
	sender_id : int
	reciever_id : int
	job_id : int
	text : str
	is_read : bool
	created_at : datetime

class ConversationOut(BaseModel):
    user_id: int
    user_name: str
    job_id: int
    job_name: str
    last_message: str
    last_message_time: datetime
    unread_count: int

