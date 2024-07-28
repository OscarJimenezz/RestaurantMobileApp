import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create a SQLAlchemy engine instance
engine = create_engine(DATABASE_URL)

# Configure sessionmaker to be used for creating database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Dependency that can be used to get a database session.
    Yields a database session and ensures its closure after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()