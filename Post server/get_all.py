import json
from flask import Flask, jsonify
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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'post_id': self.post_id,
            'path': self.path,
            'author_id': self.author_id
        }

@app.route('/api/post/list/', methods=['GET'])
def get_post_list():
    try:
        posts = Post.query.all()
        post_list = [post.to_dict() for post in posts]
        return jsonify(post_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)