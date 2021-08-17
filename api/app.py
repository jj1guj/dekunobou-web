from flask import Flask,make_response,request
from flask_cors import CORS
import subprocess
import os
api=Flask(__name__)
CORS(api)

#エンジンからの指し手を送る
@api.route("/put",methods=["PUT"])
def put():
    board=request.form["board"]
    turn=request.form["turn"]
    cp=subprocess.run(["dekunobou",board,turn],encoding="utf-8",stdout=subprocess.PIPE)
    return str(int(cp.stdout))

#人間からの指し手を受け取る(いらない)
@api.route("/send",methods=["SEND"])
def send():
    move=request.form["move"]
    return make_response(move)

@api.route("/")
def index():
    return "I'm dekunobou, computer othello program!"

if __name__ == "__main__":
    api.run(host="0.0.0.0",port=int(os.environ.get("PORT",5000)))