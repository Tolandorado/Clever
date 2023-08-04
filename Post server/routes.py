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
        post_id = hex(vector_class.post_id)[2::]
        vector_class.post_id = post_id
        db.session.add(vector_class)
        db.session.flush()
    except:
        db.session.rollback()
        return jsonify({
            "response-suc": False,
            "message": "Unexpected error"
        })
    else:
        path = vector + '/' + type + '/'
        store(path, post_id, content)
        vector_class.path = path + post_id
        db.session.commit()
        return jsonify({"response-suc": True})


@app.route('/api/post/read/<string:vector>/<string:type>/<string:post_id>/', methods=['GET'])
def read_post(vector, type, post_id):
    content = read(vector + '/' + type + '/', post_id)
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
    
    # ^ Здесь нужно прописать проверку на существование данного поста ^
    content = request.json.get('content')
    store(vector + '/' + type + '/', post_id, content)
    return jsonify({"response-suc": True})

@app.route('/api/post/delete/<string:vector>/<string:type>/<string:post_id>/', methods=['DELETE'])
def delete_post(vector, type, post_id):
    if not delete(vector + '/' + type + '/', post_id):
        return jsonify({
            "response-suc": False,
            "message": f"Can't delete the post [{post_id}]"
        })
    return jsonify({
        "response-suc": True
    })
