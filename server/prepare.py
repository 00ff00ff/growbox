import RPi.GPIO as GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.output(16, GPIO.HIGH)
GPIO.setup(11, GPIO.OUT)
GPIO.output(11, True)
GPIO.setup(12, GPIO.OUT)
GPIO.output(12, True)