from flask import Flask, request
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
    return f"Post(name='{self.name}', post_id='{self.post_id}', path='{self.path}', author_id='{self.author_id}')"


@app.route('/api/post/create/', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(name=data['name'], post_id=data['post_id'], path=data['path'], author_id=data['author_id'])
    db.session.add(new_post)
    db.session.commit()
    return f"Post {new_post.id} has been created successfully."


@app.route('/api/post/read/<int:post_id>/', methods=['GET'])
def read_post(post_id):
    post = Post.query.get_or_404(post_id)
    return f"Post {post.id}: {post.name}, {post.post_id}, {post.path}, {post.author_id}"


@app.route('/api/post/update/<int:post_id>/', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.json
    post.name = data['name']
    post.post_id = data['post_id']
    post.path = data['path']
    post.author_id = data['author_id']
    db.session.commit()
    return f"Post {post.id} has been updated successfully."


@app.route('/api/post/delete/<int:post_id>/', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return f"Post {post.id} has been deleted successfully."


if __name__ == '__main__':
    app.run(debug=True)
