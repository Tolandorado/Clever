from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Vectors.db'
db = SQLAlchemy(app)

# КЛАССЫ ДЛЯ РАБОТЫ С BD

# Здесь хранятся пути к векторам (может понадобится, вероятно, если мы захотим сделать дочерние вектора и чтоб сократить путь до файла)
class PostRoot(db.Model):
    __tablename__ = "root"

    id = db.Column(db.Integer, primary_key=True)
    vector = db.Column(db.String(50), unique=True, nullable=False)
    path = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<PostRoot vector:{self.vector}>"

# Каждый класс, который будет представлять таблицу, будет иметь похожую структуру.
# Отличаться будет только __tablename__
# Поэтому проще написать суперкласс и наследовать его другими классами, меняя в нём только лишь __tablename__
# Каждый класс-наследник будет отдельной таблицей
class Post(db.Model):
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
        return f"<Post id:{self.post_id}>"

class Music(Post):
    __tablename__ = "music"

    def __init__(self, name, type, author_id):
        super().__init__(name, type, author_id)

    def __repr__(self):
        return super().__repr__()

class Sport(Post):
    __tablename__ = "sport"

    def __init__(self, name, type, author_id):
        super().__init__(name, type, author_id)

    def __repr__(self):
        return super().__repr__()
    
class Programing(Post):
    __tablename__ = "programing"
    
    def __init__(self, name, type, author_id):
        super().__init__(name, type, author_id)

    def __repr__(self):
        return super().__repr__()

class Design(Post):
    __tablename__ = "design"
    
    def __init__(self, name, type, author_id):
        super().__init__(name, type, author_id)
    
    def __repr__(self):
        return super().__repr__()

# Пожалуй, самое моё гениальное решение за всю жизнь. Решил использовать словарик вместо if-elif-else =)
__vecdict__ = {
    "music": Music,
    "sport": Sport,
    "programing": Programing,
    "design": Design
}

# ПОЛУЧЕНИЕ НЕОБХОДИМОГО КЛАССА В ЗАВИСИМОСТИ ОТ ВЕКТОРА
def get_table_for_vector(vector) -> Post:
    """
        Принимается название вектора
        В случае, если вектор существует, будет возвращён класс, который представляет из себя таблицу
        В случае, если не существует, будет возвращено None
    """
    return __vecdict__.get(vector, None) 

def is_type_allowed(type):
    if type in ["Activities", "Projects"]: return True
    else: return False