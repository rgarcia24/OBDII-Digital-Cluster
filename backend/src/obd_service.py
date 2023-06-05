import obd
from utils import roundUnits, removeUnits
from constants import GET_DTC, SPEED, RPM, CHECK_ENGINE_LIGHT, CLEAR_DTCS
import sys

class OBD_SERVICE:
    def __init__(self, device, measurements):
        self.device = device
        self.measurements = measurements
        self.current_speed = 0
        self.current_rpms = 0
       

    def start_service(self):
        try:
            self.connection = obd.Async(self.device)
            self.connection.watch(SPEED, callback=self.get_speed)
            self.connection.watch(RPM, callback=self.get_rpm)
            self.connection.start()
        except Exception as e:
            self.handle_exception(e, "start OBD service")

    def get_car_data(self):
      data = {"speed": self.current_speed, "rpm": float(self.current_rpms)}
      return data

    def execute_cmd(self,cmd):
        try:
            response = self.connection.query(cmd)
            return response.value
        except Exception as e:
           self.handle_exception(e, f"execute command {cmd}")

    def get_speed(self, s):
       speed_units = s.value.to(self.measurements)
       speed_converted = roundUnits(speed_units)
       speed = removeUnits(str(speed_converted))
       self.current_speed = float(speed) 

    def get_rpm(self, r):
        rpmUnits = r.value.to("rpm")
        rpm_convert = roundUnits(rpmUnits)
        rpm =  removeUnits(str(rpm_convert))
        self.current_rpms = float(rpm)


    def get_dtcs(self):
        dtc = self.execute_cmd(GET_DTC)
        if(dtc is None):
            return {"Data":[], "Status": "No DTCs found"}
        return {"Data": dtc, "Status": "DTCs found"}
    
    def clear_dtcs(self):
       status =  self.execute_cmd(CLEAR_DTCS)
       return {"Status": "DTCs cleared"}
    

    def get_check_engine_light(self):
        engine_light_status = ""
        try:
            engine_light_status = self.execute_cmd(CHECK_ENGINE_LIGHT).MIL
        except:
            engine_light_status = "Unknown (is the engine on?)"
        return engine_light_status
    
    def handle_exception(self, e, action):
        print(f"Something went wrong when trying to {action}")
        print(e)
        self.connection.stop()
        self.connection.close()
        sys.exit(1)
