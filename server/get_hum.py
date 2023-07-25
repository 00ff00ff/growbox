#!/usr/bin/env python
import time
import serial
import sys
import json

if len(sys.argv) != 2:
    print("Usage: get_hum.py command(1,2,3,4)")
    sys.exit()

ser = serial.Serial(
        port='/dev/ttyUSB0',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
)
again = True
count = 0 


ser.write(bytes(sys.argv[1]))

if True:
	time.sleep(2)


	while again:

        	res = None
        
        	try:
                
                	x=ser.readline().replace('\n', '')
               		res = json.loads(x)
                	print(json.dumps(res))
                	sys.stdout.flush() 
                	again = False 
        	except:
                	count += 1



        	if count >= 3:
                	again = False
                        
else:
	sys.stdout.flush()
