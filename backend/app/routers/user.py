from app.database import get_db
from fastapi import APIRouter, Depends, HTTPException, Header
from app.models.user import User
from app.schemas.user import UserOut,UserUpdate
from app.utils import hash_password , verify_password , create_access_token
from app.dependencies import get_current_user,check_admin
from fastapi import APIRouter
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/",response_model=list[UserOut])
def get_all_users(admin : User = Depends(check_admin), db : Session = Depends(get_db)):
	users = db.query(User).all()
	return users

@router.get("/{user_id}",response_model=UserOut)
def get_user_by_id(user_id : int , user : User = Depends(get_current_user),db :Session =Depends(get_db)):
	existing = db.query(User).filter(User.id == user_id).first()
	if not existing:
		raise HTTPException(status_code=404,detail="User isn't found")
	return existing

@router.get("/by-email/{email}",response_model=UserOut)
def search_user_by_email(email : str,user : User=Depends(get_current_user),db : Session = Depends(get_db)):
	existing = db.query(User).filter(User.email == email).first()
	if not existing :
		raise HTTPException(status_code=404,detail="User isn't found")
	return existing

@router.put("/api/users/{user_id}",response_model=UserOut)
def update_user(body:UserUpdate,user_id : int ,db:Session = Depends(get_db),current_user : User = Depends(get_current_user)):
	exist = db.query(User).filter(User.id == user_id).first()
	if not exist:
		raise HTTPException(status_code=404,detail="User isn't found")
	if current_user.id != user_id and current_user.role != 1 :
		raise HTTPException(403,"Not allowed")
	exist.name = body.name
	exist.email = body.email
	exist.phone = body.phone
	db.commit()
	db.refresh(exist)
	return exist





