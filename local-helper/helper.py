from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

# Allow your website to communicate with Flask
CORS(app)


@app.route("/receive-code", methods=["POST"])
def receive_code():

    data = request.json

    code = data.get("code")

    print("====================")
    print("Received Sonic Pi code:")
    print(code)
    print("====================")

    return jsonify({
        "status": "success"
    })


if __name__ == "__main__":

    print("Local Helper Started")

    app.run(
        host="127.0.0.1",
        port=5000
    )
