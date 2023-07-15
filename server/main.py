from flask import Flask, render_template, request, jsonify

app = Flask("Flask server")

@app.route("/api/get-test", methods=["POST", "GET"])
def api_test():
    data = {
        'name': 'John',
        'age': 25
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run('localhost', debug=True)
    