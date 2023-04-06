from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
cors = CORS(app)


speed = 0

@socketio.on('get_data')
def handle_message(message):

    data = get_car_data()
    emit('data', data)


def startSocketServer(obdService):
    global get_car_data
    get_car_data = obdService.get_car_data
    socketio.run(app)

