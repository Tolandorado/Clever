from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Users.db" # Я использую sqlite для теста
db = SQLAlchemy(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.String(50), unique=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password
    
    def __repr__(self):
        return f"<User id:{self.user_id} name:\"{self.username}\">"
    

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

# Создаёт пользователя
@app.route("/api/users/create", methods=["POST",])
def create_user():
    new_user = User(request.json.get('username'), request.json.get('password'))
    try:
        db.session.add(new_user)
        db.session.flush()
    except Exception as ex:
        db.session.rollback()
        print(ex)
        print("Не удалось создать пользователя", new_user)
        return jsonify({
            "response-suc": False
        })
    else:
        new_user.user_id = hex(new_user.id)[2::]
        db.session.commit()
        print("Создан пользователь", new_user)
        return jsonify({
            "response-suc": True
        })

# Возвращает список пользователей
@app.route("/api/users/get", methods=["GET",])
def get_users():
    try:
        users = User.query.all()
    except Exception as ex:
        print(ex)
        return jsonify({
            "response-suc": False
        })
    else:
        if users is None: return jsonify({
            "response-suc": True,
            "users": None
        })
        for i in range(len(users)): users[i] = {
            "id": users[i].user_id if users[i] is not None else None,
            "username": users[i].username if users[i] is not None else None
        }
        users = {
            "response-suc": True,
            "users": users
        }
        return jsonify(users)

# Возвращает пользователя по id
@app.route("/api/users/get/<string:user_id>")
def get_user_by_id(user_id):
    try:
        user = db.session.query(User).filter_by(user_id=user_id).one()
    except Exception as ex:
        print(ex)
        return jsonify({
            "responce-suc": False
        })
    else:
        return jsonify({
            "response-suc": True,
            "username": user.username if user is not None else None,
            "password": user.password if user is not None else None
        })

# Удаляет пользователя с подходящим id из базы данных
@app.route("/api/users/delete/<string:user_id>", methods=["DELETE",])
def delete_user(user_id):
    try:
        User.query.filter_by(user_id=user_id).delete()
        db.session.flush()
    except Exception as ex:
        db.session.rollback()
        print(ex)
        return jsonify({
            "response-suc": False
        })
    else:
        db.session.commit()
        return jsonify({
            "response-suc": True
        })


# Ищёт в бд пользователя с указанных именем и проверяет пароль на соответствие.
# В случае отстутствия пользователя с таким именем, или несоотвествия пароля в correct будет выведено False
@app.route("/api/users/verify", methods=["GET", "POST"])
def verify_user():
    if request.method == "GET":
        username = request.json.get('username')
        password = request.json.get('password')
    elif request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
    
    try:
        user = User.query.filter_by(username=username).one()
    except Exception as ex:
        print(ex)
        return jsonify({
            "response-suc": False
        })
    else:
        return jsonify({
            "response-suc": True,
            "correct": False if user is None or user.password != password else True,
            "id": user.user_id if user is not None and user.password == password else None
        })

if __name__ == "__main__":
    app.run("0.0.0.0", 5000, debug=True)