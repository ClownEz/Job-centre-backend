from pydantic import BaseModel
from datetime import datetime

class RequestCreate(BaseModel):
	company_name : str
	industry : str
	location : str | None = None
	phone : str | None = None
	website : str | None = None
	description : str | None = None

class RequestOut(BaseModel):
	id : int
	user_id : int
	company_name : str
	description : str | None
	location : str | None
	industry : str
	website : str | None
	phone : str | None
	status : str
	created_at : datetime
