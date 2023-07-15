from flask import Flask, render_template, request, jsonify

app = Flask("Flask server")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/get-test", methods=["POST", "GET"])
def api_test():
    data = """[
    {
        "id": 0,
        "name": "Jojo"
    },
    {
        "id": 1,
        "name": "ttt"
    }
    ]"""
    return data


if __name__ == "__main__":
    app.run('localhost', debug=True)
    