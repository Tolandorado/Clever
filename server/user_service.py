from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://klever:1@192.168.1.72:5432/users"
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password
    
    def __repr__(self):
        return f"<User id:{self.id} name:\"{self.username}\">"
    

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

# Создаёт пользователя
@app.route("/users/api/create", methods=["POST",])
def create_user():
    new_user = User(request.form["username"], request.form["password"])
    try:
        db.session.add(new_user)
        db.session.flush()
    except Exception as ex:
        db.session.remove()
        print(ex)
        print("Не удалось создать пользователя", new_user)
        return jsonify({
            "responce-suc": False
        })
    else:
        db.session.commit()
        print("Создан пользователь", new_user)
        return jsonify({
            "responce-suc": True
        })

# Возвращает список пользователей
@app.route("/users/api/get", methods=["GET",])
def get_users():
    try:
        users = User.query.all()
    except Exception as ex:
        print(ex)
        return jsonify({
            "responce-suc": False
        })
    else:
        if users is None: return jsonify({
            "responce-suc": True,
            "users": None
        })
        for i in range(len(users)): users[i] = {
            "id": users[i].id if users[i] is not None else None,
            "username": users[i].username if users[i] is not None else None
        }
        users = {
            "responce-suc": True,
            "users": users
        }
        return jsonify(users)

# Возвращает пользователя по id
@app.route("/users/api/get/<string:user_id>")
def get_user_by_id(user_id):
    user_id = int(user_id, 16)
    try:
        user = User.query.get(user_id)
    except Exception as ex:
        print(ex)
        return jsonify({
            "responce-suc": False
        })
    else:
        return jsonify({
            "responce-suc": True,
            "username": user.username if user is not None else None,
            "password": user.password if user is not None else None
        })

# Удаляет пользователя с подходящим id из базы данных
@app.route("/users/api/delete/<string:user_id>", methods=["DELETE",])
def delete_user(user_id):
    user_id = int(user_id, 16)
    try:
        User.query.filter_by(id=user_id).delete()
        db.session.flush()
    except Exception as ex:
        db.session.rollback()
        print(ex)
        return jsonify({
            "responce-suc": False
        })
    else:
        db.session.commit()
        return jsonify({
            "responce-suc": True
        })


# Ищёт в бд пользователя с указанных именем и проверяет пароль на соответствие.
# В случае отстутствия пользователя с таким именем, или несоотвествия пароля в correct будет выведено False
@app.route("/users/api/verify", methods=["GET", "POST"])
def verify_user():
    if request.method == "GET":
        username = request.args["username"]
        password = request.args["password"]
    elif request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
    
    try:
        user = User.query.filter_by(username=username).one()
    except Exception as ex:
        print(ex)
        return jsonify({
            "responce-suc": False
        })
    else:
        return jsonify({
            "responce-suc": True,
            "correct": False if user is None or user.password != password else True,
            "id": user.id if user is not None and user.password == password else None
        })

if __name__ == "__main__":
    app.run("localhost", 5000, debug=True)