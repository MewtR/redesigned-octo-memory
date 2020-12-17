const Timer = require('./timer');
const helpers = require('./helpers');
module.exports = class Pendulum {
    
    constructor(initialAngle, length, timer){
        this.initialAngle = initialAngle;
        this.length = length;
        //this.timer = new Timer();
        this.timer = timer;
    }

    start(){
        this.timer.start();
    }
    stop(){
        this.timer.stop();
    }

    getCurrentTimeElapsed(){
        console.log("Timer is: ", this.timer);

        this.timer.getCurrentTimeElapsed();
    }

    getCurrentAngle(){
        return helpers.angularDisplacement(this.initialAngle, this.length, this.timer.getCurrentTimeElapsed);
    }

    getCoordinates(){
        return helpers.coordinates(this.getCurrentAngle, this.length);
    }
};
