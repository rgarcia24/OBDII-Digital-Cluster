from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
cors = CORS(app)


speed = 0

@socketio.on('get_data')
def get_data(message):
    data = get_car_data()
    emit('data', data)

@socketio.on("get_dtc")
def get_DTC(message):
    dtcs = get_car_dtc()
    emit("dtcs", dtcs)

@socketio.on("clear_dtcs")
def clear_DTC(message):
    status = clear_car_dtc()
    emit("dtcs_cleared", status)

def startSocketServer(obdService):
    global get_car_data
    global get_car_dtc
    global clear_car_dtc
    get_car_data = obdService.get_car_data
    get_car_dtc = obdService.get_dtcs
    clear_car_dtc = obdService.clear_dtcs
    socketio.run(app)

