from flask import Flask,make_response,request
from flask_cors import CORS
import subprocess
api=Flask(__name__)
CORS(api)

#エンジンからの指し手を送る
@api.route("/put",methods=["PUT"])
def put():
    board=request.form["board"]
    turn=request.form["turn"]
    cp=subprocess.run(["dekunobou",board,turn],encoding="utf-8",stdout=subprocess.PIPE)
    return str(int(cp.stdout))

#人間からの指し手を受け取る
@api.route("/send",methods=["SEND"])
def send():
    move=request.form["move"]
    return make_response(move)

if __name__ == "__main__":
    api.run(debug=True)