from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Vectors.db'
db = SQLAlchemy(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

# КЛАССЫ ДЛЯ РАБОТЫ С BD

# Здесь хранятся пути к векторам (может понадобится, вероятно, если мы захотим сделать дочерние вектора и чтоб сократить путь до файла)
class PostRoot(db.Model):
    __tablename__ = "root"

    id = db.Column(db.Integer, primary_key=True)
    vector = db.Column(db.String(50), unique=True, nullable=False)
    path = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<PostRoot vector:{self.vector}>"


class Music(db.Model):
    __tablename__ = "music"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50))
    path = db.Column(db.String(200))
    author_id = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)

    def __init__(self, name, type, author_id):
        self.name = name
        self.type = type
        self.author_id = author_id

    def __repr__(self):
        return f"<Music id:{self.post_id}>"

class Sport(db.Model):
    __tablename__ = "sport"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50))
    path = db.Column(db.String(200))
    author_id = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)

    def __init__(self, name, type, author_id):
        self.name = name
        self.type = type
        self.author_id = author_id

    def __repr__(self):
        return f"<Sport id:{self.post_id}>"
    
class Programming(db.Model):
    __tablename__ = "programming"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50))
    path = db.Column(db.String(200))
    author_id = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)

    def __init__(self, name, type, author_id):
        self.name = name
        self.type = type
        self.author_id = author_id

    def __repr__(self):
        return f"<Programming id:{self.post_id}>"
    
class Design(db.Model):
    __tablename__ = "design"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50))
    path = db.Column(db.String(200))
    author_id = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)

    def __init__(self, name, type, author_id):
        self.name = name
        self.type = type
        self.author_id = author_id

    def __repr__(self):
        return f"<Design id:{self.post_id}>"

# Пожалуй, самое моё гениальное решение за всю жизнь. Решил использовать словарик вместо if-elif-else =)
__vecdict__ = {
    "music": Music,
    "sport": Sport,
    "programming": Programming,
    "design": Design
}

# ПОЛУЧЕНИЕ НЕОБХОДИМОГО КЛАССА В ЗАВИСИМОСТИ ОТ ВЕКТОРА
def get_table_for_vector(vector):
    """
        Принимается название вектора
        В случае, если вектор существует, будет возвращён класс, который представляет из себя таблицу
        В случае, если не существует, будет возвращено None
    """
    return __vecdict__.get(vector, None) 

def is_type_allowed(type):
    if type in ["Activities", "Projects"]: return True
    else: return False