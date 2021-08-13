from flask import Flask,make_response,request
from flask_cors import CORS
api=Flask(__name__)

#エンジンからの指し手を送る
@api.route("/put",methods=["PUT"])
def put():
    return 0

#人間からの指し手を受け取る
@api.route("/send",methods=["SEND"])
def send():
    move=request.form["move"]
    return make_response(move)

if __name__ == "__main__":
    api.run(debug=True)