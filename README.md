### Simple Pendulum Simulator

Simple program that can simulate several pendulums.

#### General Information
- The 5 pendulums run on localhost ports 3001 to 3005. This implies that in order to set values on pendulum 3 for example you should `POST` to port 3003.
- Another process runs on localhost port 3000 whose purpose is to export the configuration of all the pendulums.

#### Running It
- clone this repo and `cd` into it. Alternatively you can download it as a zip, extract it and `cd` into it.
- `node back/app.js` to run the backend.
- open `front/pendulums.html` in a browser to get the frontend.

#### The REST interface
- `GET /start` starts the pendulum's timer.
- `GET /stop` pauses the pendulum's timer. It can be started again with `/start`.
- `GET /time` returns the current number of milliseconds passed since the pendulum has started.
- `GET /angle` returns the current angle of the pendulum.
- `GET /coordinates` returns the current x,y coordinates of the pendulum.
- `GET /drawinfo` returns necessary information to draw the pendulum in the frontend (length,x,y,time,angle and whether the pendulum is currently stopped or not).
- `POST /set` Sets values on the pendulum. You can `POST` something like `{length: 5}` to just set the length or something like `{length: 5, initialAngle: 38, mass: 3, proportionalityConstant: 1}` to set everything at once.
- `GET /neighbours` returns a pendulum's immediate neighbours.
- `GET /python` generates a python script that outputs the pendulum's coordinates as a function of time.
- `GET /` just returns the pendulum.
- `GET /export` on port 3000 returns a JSON file with the pendulums' current parameters.
