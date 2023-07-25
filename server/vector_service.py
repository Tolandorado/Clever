from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://test_user:1@192.168.1.72:5432/test_db" # Я использую sqlite для теста
db = SQLAlchemy(app)

class Vectors_paths(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vector = db.Column(db.String(40))
    path = db.Column(db.String(100))

    def __init__(self, vector, path):
        self.vector = vector
        self.path = path
    
    def __repr__(self):
        return f"<Vectors_paths id:{self.id}> vector:{self.vector}"

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/vector", methods=["POST"])
def test():
    vector = Vectors_paths(request.form["vector"] ,request.form["path"])
    db.session.add(vector)
    db.session.flush()
    db.session.commit()
    return "Почитай лог сервера ->"

@app.route("/vector-read", methods=["POST"])
def test_r():
    vector = db.session.query(Vectors_paths).filter_by(vector=request.form["vector"])
    print(vector)
    return "Почитай лог сервера ->"

if __name__ == "__main__":
    app.run("0.0.0.0", 5000, debug=True)