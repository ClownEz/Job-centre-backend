from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(title="Job CENTRE", lifespan=lifespan)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)
