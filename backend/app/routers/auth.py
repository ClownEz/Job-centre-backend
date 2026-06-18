from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserLogin , UserRegister
from app.schemas.user import UserOut,U
from app.utils import hash_password , verify_password , create_access_token
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
def register_user(data : UserRegister, db : Session = (get_db)):
	if db.query(User).filter(User.email == data.email).first():
		raise HTTPException(status_code=400,detail="This email already exist")
	user = User(
		name = data.name,
		email = data.email,
		phone = data.phone,
		password = hash_password(data.password)
		)
	db.add(user)
	db.commit()
	db.refresh(user)
	token = create_access_token({"id" : user.id , "role" : user.role})
	return {"token" : token, "user" : UserOut.model_validate(user)}

@router.post("/login")
def login(body : UserLogin,db : Session = Depends(get_db)):
	user = db.query(User).filter(User.email == body.email).first()
	if not user or not verify_password(body.password, user.password_hash):
		raise HTTPException(status_code=401,detail="invalid email or password")
	token = create_access_token({"id" : user.id,"role" : user.role})
	return {"token" : token,"user" : UserOut.model_validate(user)}

@router.get("me",response_model= UserOut)
def me(user:User=Depends(get_current_user)):
	return user

