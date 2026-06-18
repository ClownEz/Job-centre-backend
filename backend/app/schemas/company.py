from pydantic import BaseModel


class CompanyCreate(BaseModel):
	name : str
	description : str
	industry : str
	location : str | None = None
	phone : str | None = None
	website : str | None = None

class CompanyUpdate(BaseModel):
	description : str | None = None
	industry : str | None = None
	location : str | None = None
	phone : str | None = None
	website : str | None = None

class CompanyOut(BaseModel):
	id : int
	name : str
	user_id : int
	description : str
	industry : str
	location : str | None
	phone : str | None
	website : str | None
