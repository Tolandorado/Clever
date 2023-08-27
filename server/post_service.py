from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:56786789@localhost/clever_bd'
db = SQLAlchemy(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.String(50), nullable=False)
    path = db.Column(db.String(200), nullable=False)
    author_id = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Post id:{self.post_id}>"


@app.route('/api/post/create/', methods=['POST'])
def create_post():
    try:
        data = request.json
        new_post = Post(name=data['name'], post_id=data['post_id'], path=data['path'], author_id=data['author_id'])
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': f"Post {new_post.id} has been created successfully."}), 201
    except KeyError:
        return jsonify({'error': 'Invalid data provided.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/read/<int:post_id>/', methods=['GET'])
def read_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        return jsonify({'id': post.id, 'name': post.name, 'post_id': post.post_id, 'path': post.path, 'author_id': post.author_id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/update/<int:post_id>/', methods=['PUT'])
def update_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        data = request.json
        post.name = data['name']
        post.post_id = data['post_id']
        post.path = data['path']
        post.author_id = data['author_id']
        db.session.commit()
        return jsonify({'message': f"Post {post.id} has been updated successfully."}), 200
    except KeyError:
        return jsonify({'error': 'Invalid data provided.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/post/delete/<int:post_id>/', methods=['DELETE'])
def delete_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': f"Post {post.id} has been deleted successfully."}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)