from flask import Flask, request, jsonify
from flask_cors import CORS
from pythonosc import udp_client

app = Flask(__name__)

# Allow your website to communicate with Flask
CORS(app)
client = udp_client.SimpleUDPClient(
    "127.0.0.1",
    4560
)


@app.route("/receive-code", methods=["POST"])
def receive_code():

    data = request.json

    code = data.get("code")

    if not code or code.strip() == "":
        return jsonify({
            "status": "error",
            "message": "No Sonic Pi code received"
        })

    print("====================")
    print("Received Sonic Pi code:")
    print(code)
    print("====================")

    # Save code into file
    with open("generated_music.rb", "w") as file:
        file.write(code)

    client.send_message(
        "/sonic-code",
        code
    )

    print("Code sent to Sonic Pi")
    print("Code saved successfully")

    return jsonify({
        "status": "success",
        "message": "Code received and saved"
    })


if __name__ == "__main__":

    print("Local Helper Started")

    app.run(
        host="127.0.0.1",
        port=5000
    )
