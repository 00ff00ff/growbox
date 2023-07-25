import SI1132
import BME280
import sys
import time
import os
import json

if len(sys.argv) != 2:
    print("Usage: weather_board.py <i2c device file>")
    sys.exit()

si1132 = SI1132.SI1132(sys.argv[1])
bme280 = BME280.BME280(sys.argv[1], 0x03, 0x02, 0x02, 0x02)

def get_altitude(pressure, seaLevel):
    atmospheric = pressure / 100.0
    return 44330.0 * (1.0 - pow(atmospheric/seaLevel, 0.1903))

data = {
    'uv': 0,
    'lux': 0,
    'ir': 0,
    'temp': 0,
    'pres': 0,
    'hum': 0,
    
    
}


data['temp'] = round(bme280.read_temperature(),1)
data['ir'] = int(si1132.readIR())
data['uv'] = (si1132.readUV() / 100.0)
data['hum'] = round(bme280.read_humidity())
data['lux'] = int(si1132.readVisible())
data['pres'] = round(bme280.read_pressure()/100.0)
print(json.dumps(data))
sys.stdout.flush()
