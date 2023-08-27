from classes import *
from storage import *

@app.route('/api/post/create/', methods=['POST'])
def create_post():
    vector = request.json.get('vector')
    type = request.json.get('type')
    user = request.json.get('user')
    name = request.json.get('name')
    content = request.json.get('content')

    try:
        vector_class = get_table_for_vector(vector)
        if vector_class is None: return jsonify({
            "response-suc": False,
            "message": f"No such a vector \"{vector}\""
        })
        if not is_type_allowed(type): return jsonify({
            "response-suc": False,
            "message": f"No such a type {type}"
        })
        vector_class = vector_class(name, type, user)
        db.session.add(vector_class)
        db.session.flush()
    except Exception as ex:
        db.session.rollback()
        return jsonify({
            "response-suc": False,
            "message": str(ex)
        })
    else:
        post_id = hex(vector_class.id)[2::]
        vector_class.post_id = post_id
        path = type + '/' + vector + '/'
        store(path, post_id, content)
        vector_class.path = path + post_id
        db.session.commit()
        return jsonify({"response-suc": True})

@app.route("/api/post/get", methods=["GET"])
def get_posts():
    # Получение данных для фильтрации по вектору и типу
    vectors = request.json.get("vectors")
    types = request.json.get("types")

    post_list = []

    # Сначала ограничиваем вектора:
    for vector in vectors:
        vector_class = get_table_for_vector(vector)
        if vector_class is None: return jsonify({
            "response-suc": False,
            "message": f"No such a vector \"{vector}\"" 
        })
        # Теперь по типам:
        for type in types:
            if not is_type_allowed(type): return jsonify({
                "response-suc": False,
                "message": f"No such a type {type}"
            })
            posts = db.session.query(vector_class).filter_by(type=type).all()
            for post in posts:
                post_list.append({
                    "vector": vector,
                    "type": post.type,
                    "id": post.author_id,
                    "name": post.name
                })
    response = jsonify({
        "response-suc": True,
        "posts": post_list,
    })
    response.headers["X-Total-Count"] = len(post_list)
    return response

@app.route('/api/post/read/<string:vector>/<string:type>/<string:post_id>/', methods=['GET'])
def read_post(vector, type, post_id):
    content = read(type + '/' + vector + '/', post_id)
    if content is None: return jsonify({
        "response-suc": False,
        "message": "No such a post"
    })
    return jsonify({
        "response-suc": True,
        "content": content
    })

@app.route('/api/post/update/<string:vector>/<string:type>/<string:post_id>/', methods=['PUT'])
def update_post(vector, type, post_id):
    vector_class = get_table_for_vector(vector)
    if vector_class is None: return jsonify({
        "response-suc": False,
        "message": f"No such a vector \"{vector}\""       
    }) 

    if db.session.query(vector_class).filter_by(post_id=post_id).one() is None: return jsonify({
        "response-suc": False,
        "message": "No such a post"
    })

    # ^ Здесь нужно прописать проверку на существование данного поста ^
    content = request.json.get('content')
    store(type + '/' + vector + '/', post_id, content)
    return jsonify({"response-suc": True})

@app.route('/api/post/delete/<string:vector>/<string:type>/<string:post_id>/', methods=['DELETE'])
def delete_post(vector, type, post_id):
    vector_class = get_table_for_vector(vector)
    if vector_class is None: return jsonify({
        "response-suc": False,
        "message": f"No such a vector \"{vector}\""
    })
    db.session.query(vector_class).filter_by(post_id=post_id).delete()

    if not delete(type + '/' + vector + '/', post_id):
        return jsonify({
            "response-suc": False,
            "message": f"Can't delete the post [{post_id}]"
        })
    return jsonify({
        "response-suc": True
    })
