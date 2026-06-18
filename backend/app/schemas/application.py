from pydantic import BaseModel

class ApplicationCreate(BaseModel):
    letter : str
    applicant_name : str
    email : str
    phone : str
    cover_letter : str | None = None
    job_id : int

class ApplicationUpdate(BaseModel):
    letter : str | None = None
    applicant_name : str | None = None
    email : str | None = None
    phone : str | None = None
    cover_letter : str | None = None
class ApplicationOut(BaseModel):
    id : int
    job_id : int
    resume_id : int | None
    letter : str
    applicant_name : str
    email : str
    phone : str
    cover_letter : str | None

class AplicationStatusUpdate(BaseModel):
    status : str




