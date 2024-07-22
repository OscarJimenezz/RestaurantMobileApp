from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
import os
from datetime import datetime

# Environment Variables for Database Connection
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')

# Construct Database URI
DATABASE_URI = f'mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}'

# Initialize SQLAlchemy Engine
engine = create_engine(DATABASE_URI, echo=True)

# Base class for declarative models
Base = declarative_base()

# User Model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    reservations = relationship('Reservation', backref='user')
    orders = relationship('Order', backref='user')

# Menu Item Model
class MenuItem(Base):
    __tablename__ = 'menu_items'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255))
    price = Column(Float, nullable=False)
    related_orders = relationship('Order', back_populates='ordered_item')

# Reservation Model
class Reservation(Base):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    contact_name = Column(String(255), nullable=False)
    contact_email = Column(String(255))
    reservation_date_time = Column(DateTime, nullable=False)

# Order Model
class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    quantity = Column(Integer, nullable=False)
    menu_item_id = Column(Integer, ForeignKey('menu_items.id'))
    order_timestamp = Column(DateTime, index=True, default=datetime.utcnow)
    ordered_item = relationship('MenuItem', back_populates='related_orders')

# Generate database schema
Base.metadata.create_all(engine)