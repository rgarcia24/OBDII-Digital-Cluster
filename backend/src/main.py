from obd_service import OBD_SERVICE
from socket_server import startSocketServer
import time
import obd

def main():
    obdService = OBD_SERVICE("/dev/pts/3", "mph")
    obdService.start_service()

    if(obdService.connection.status() == obd.OBDStatus.CAR_CONNECTED):
        print("Connected to OBD-II adapter")
        startSocketServer(obdService)
    else:
        print("Error connecting to OBD-II adapter")
        quit()


main()