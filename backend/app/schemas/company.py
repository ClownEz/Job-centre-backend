from pydantic import BaseModel


class CompanyCreate(BaseModel):
	name : str
	description : str
	industry : str
	location : str | None = None
	phone : str | None = None
	website : str | None = None