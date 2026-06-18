from pydantic import BaseModel
from datetime import datetime


class JobCreate(BaseModel):
	name : str
	description : str | None = None
	requirements : str | None = None
	salary_min : int | None = None
	salary_max : int | None = None
	experience_level : str | None = None
	location :str | None = None
	category_id : int

class JobUpdate(BaseModel):
	description : str | None = None
	requirements : str | None = None
	salary_min : int | None = None
	salary_max : int | None = None
	experience_level : str | None = None
	location :str | None = None
class JobOut(BaseModel):
	id : int
	name : str
	company_id : int
	category_id : int
	description : str | None
	requirements : str | None
	salary_min : int | None
	salary_max : int | None
	posted_data : datetime
	status : str
	experience_level : str | None
	location : str | None
