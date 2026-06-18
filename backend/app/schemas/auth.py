from pydantic import BaseModel

class UserRegister(BaseModel):
	name : str
	email : str
	phone : str
	password : str

class UserLogin(BaseModel):
	email : str
	password : str