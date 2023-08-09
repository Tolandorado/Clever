from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declared_attr

db = SQLAlchemy()


class BasePost(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50), nullable=False)
    path = db.Column(db.String(200), nullable=False)
    author_id = db.Column(db.String(200), nullable=False)
    vector = db.Column(db.String(200), nullable=False)
    post_type = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'post_id': self.post_id,
            'path': self.path,
            'author_id': self.author_id,
            'vector': self.vector,
            'post_type': self.post_type
        }


class Post(BasePost):
    pass


class Music(BasePost):
    pass


class Sport(BasePost):
    pass


class Programing(BasePost):
    pass


class Design(BasePost):
    pass





