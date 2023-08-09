from flask import Flask, request, jsonify
from models import db, Post, Music, Sport, Programing, Design

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:56786789@localhost/clever_bd'
db.init_app(app)
with app.app_context():
    db.create_all()


def get_table_for_vector(vector):
    table_mapping = {
        'vector1': Post,
        'vector2': Music,
        'vector3': Sport,
        'vector4': Design,
        'vector5': Programing
    }
    return table_mapping.get(vector)


@app.route('/api/post/create/', methods=['POST'])
def create_post():
    try:
        data = request.json
        vector = data.get('vector')
        post_type = data.get('post_type')

        table = get_table_for_vector(vector)

        if table and post_type:
            new_post = table(**data)
            db.session.add(new_post)
            db.session.commit()
            return jsonify({'message': f"Post {new_post.id} has been created successfully."}), 201
        else:
            return jsonify({'error': 'Invalid vector or post_type provided.'}), 400
    except KeyError:
        return jsonify({'error': 'Invalid data provided.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/read/<int:post_id>/', methods=['GET'])
def read_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        return jsonify(post.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/update/<int:post_id>/', methods=['PUT'])
def update_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        data = request.json
        vector = data.get('vector')
        post_type = data.get('post_type')

        if vector and post_type:
            table = get_table_for_vector(vector)
            if table:
                for key, value in data.items():
                    setattr(post, key, value)
                db.session.commit()
                return jsonify({'message': f"Post {post.id} has been updated successfully."}), 200
            else:
                return jsonify({'error': 'Invalid vector provided.'}), 400
        else:
            return jsonify({'error': 'Invalid vector or post_type provided.'}), 400
    except KeyError:
        return jsonify({'error': 'Invalid data provided.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/list/', methods=['GET'])
def get_post_list():
    try:
        vectors = request.args.getlist('vectors')
        types = request.args.getlist('types')

        query = db.session.query()

        for vector in vectors:
            table = get_table_for_vector(vector)
            if table:
                query = query.union_all(db.session.query(table))

        if types:
            query = query.filter(Post.post_type.in_(types))

        posts = query.all()
        post_list = [post.to_dict() for post in posts]
        return jsonify(post_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/delete/<int:post_id>/', methods=['DELETE'])
def delete_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        table = get_table_for_vector(post.vector)
        if table:
            post_from_table = table.query.get_or_404(post_id)
            db.session.delete(post_from_table)
            db.session.commit()
            return jsonify({'message': f"Post {post.id} has been deleted successfully."}), 200
        else:
            return jsonify({'error': 'Invalid vector provided.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)