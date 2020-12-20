import math
import time

initial_angle = 
length = 
def to_radians(angle):
    return angle * (math.pi/180)
def to_degress(angle):
    return angle * (180/math.pi)

def angular_displacement(initial_angle, length, time):
    g = 9.8
    rad = to_radians(initial_angle)
    angular_frequency = math.sqrt(g/length)
    return to_degress( rad * math.cos(angular_frequency*(time)))
def coordinates(angle, length):
    rad = to_radians(angle)
    x = length * math.sin(rad)
    y = length * math.cos(rad)
    return x,y

start = time.time()
print('Hello world')

while True:
    x,y = coordinates(angular_displacement(initial_angle, length, time.time() - start), length)
    print('x: {}, y: {}'.format(x,y))
    time.sleep(0.2)
