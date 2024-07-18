from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
import os

DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')

DATABASE_URI = f'mysql+pymysql://{DB_DEF_USER}:{DB_DEF_PASS}@{DB_DEF_HOST}/{DB_NAME}'

engine = create_engine(DATABASE_URI, echo=True)

Base = declarative_base()

class MenuItem(Base):
    __tablename__ = 'menu_items'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255))
    price = Column(Float, nullable=False)
    orders = relationship('Order', back_populates='menu_item')

class Reservation(Base):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255))
    date_time = Column(DateTime, nullable=False)

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    quantity = Column(Integer, nullable=False)
    menu_item_id = Column(Integer, ForeignKey('menu_items.id'))
    menu_item = relationship('MenuItem', back_populates='orders')

Base.metadata.create_all(engine)