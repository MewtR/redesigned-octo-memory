import math
import time

initial_angle = 
length = 
mass = False
proportionality_constant = False
def to_radians(angle):
    return angle * (math.pi/180)
def to_degrees(angle):
    return angle * (180/math.pi)

def angular_displacement(initial_angle, length, time):
    g = 9.8
    rad = to_radians(initial_angle)
    angular_frequency = math.sqrt(g/length)
    return to_degrees( rad * math.cos(angular_frequency*(time)))
def damped_angular_displacement(initial_angle, length, time, mass, proportionality_constant):
    g = 9.8
    rad = to_radians(initial_angle)
    dampling_coefficient = proportionality_constant/(2*mass)
    g_over_l = g/length
    b2_over_4m2 = pow(proportionality_constant,2)/(4*pow(mass,2))
    angular_frequency_prime = math.sqrt(g_over_l-b2_over_4m2)
    e = pow(math.e, -dampling_coefficient*time)
    angle = to_degrees( rad * e * math.cos(angular_frequency_prime*time))
    return angle


def coordinates(angle, length):
    rad = to_radians(angle)
    x = length * math.sin(rad)
    y = length - length * math.cos(rad)
    return x,y

damped = False
if (mass and proportionality_constant):
    damped = True
start = time.time()

if damped:
    while True:
        x,y = coordinates(damped_angular_displacement(initial_angle, length, time.time() - start, mass, proportionality_constant), length)
        print('x: {}, y: {}'.format(x,y))
        time.sleep(0.2)
else:
    while True:
        x,y = coordinates(angular_displacement(initial_angle, length, time.time() - start), length)
        print('x: {}, y: {}'.format(x,y))
        time.sleep(0.2)
