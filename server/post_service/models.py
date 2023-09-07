from flask import Flask, request, jsonify, session, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Vectors.db'
db = SQLAlchemy(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config["SECRET_KEY"] = "awaf11uhuieiudnuiqdh"
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

class BasePost(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.String(50), unique=True)
    postName = db.Column(db.String(200), nullable=False)
    postingTime = db.Column(db.String(20), nullable=False)
    authorName = db.Column(db.String(200), nullable=False)
    authorId = db.Column(db.String(50), nullable=False)
    vector = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=True)
    #image = db.Column(db.LargeBinary, nullable=False)

    def __repr__(self):
        return f"<Post v:{self.vector} t:{self.type} i:{self.id}>"

class Activities(BasePost):
    __tablename__ = "activities"

    def __repr__(self):
        return super().__repr__()

class Projects(BasePost):
    __tablename__ = "projects"

    def __repr__(self):
        return super().__repr__()

ALLOWED_TYPES = {
    "projects": Projects,
    "activities": Activities
}

def get_table_by_type(type: str):
    return ALLOWED_TYPES.get(type, None)
    
