
#!/usr/bin/env python
import time
import serial
import sys
import json
# import asyncio

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
# again = True
# count = 0

#sys.stdout.flush()
# # sys.stdin.flush()
# ser.write(bytes(sys.argv[1]))


#ser.write(bytes(sys.argv[1]))
# while True:
#     try:
#         ser.write(bytes(sys.argv[1])+'\n')
#         # if ser.in_waiting > 0:
#         ser_bytes = ser.readline()
    
#         print(ser_bytes)
#     except KeyboardInterrupt:
#         print("Keyboard Interrupt")
#         break
ser.close()
ser.open()
ser.write(bytes(sys.argv[1])+"\n")
ser.flush()
ser_bytes = ser.read_until('\n',10)
print(ser_bytes)

# x=ser.readline()
# print(x)


# while True:
#     received_data = ser.readline()             #read serial port
    
#     print (received_data)   
#     ser.write(bytes(sys.argv[1]))    

# print(x)
# res = json.loads(x)
# print(json.dumps(res))
#sys.stdout.flush()


# print('Running. Press CTRL-C to exit.')
# with serial.Serial(
#         port='/dev/ttyUSB0',
#         baudrate = 9600,
#         parity=serial.PARITY_NONE,
#         stopbits=serial.STOPBITS_ONE,
#         bytesize=serial.EIGHTBITS,
#         timeout=1
# ) as arduino:
#     time.sleep(0.1) #wait for serial to open
#     if arduino.isOpen():
#         print("{} connected!".format(arduino.port))
#         try:
#             while True:
                
#                 arduino.write(bytes(sys.argv[1]))
#                 # time.sleep(1) #wait for arduino to answer
#                 while arduino.inWaiting()==0: pass
#                 if  arduino.inWaiting()>0: 
#                     answer=arduino.readline()
#                     print(answer)
#                     arduino.flushInput() #remove data after reading
#         except KeyboardInterrupt:
#             print("KeyboardInterrupt has been caught.")
