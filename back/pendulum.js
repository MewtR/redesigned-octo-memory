const Timer = require('./timer');
const helpers = require('./helpers');
module.exports = {
    createPendulum: (pendulumNumber, numberOfPendulums = 5,initialAngle = 20, length = 0.03, timer = Timer.createTimer()) => ({
        pendulumNumber,
        initialAngle,
        length,
        timer,
        numberOfPendulums,
        start(){
            this.timer.start();
        },
        stop(){
            this.timer.stop();
        },
        getCurrentTimeElapsed(){
            return this.timer.getCurrentTimeElapsed();
        },
        getCurrentAngle(){
            return helpers.angularDisplacement(this.initialAngle, this.length, this.timer.getCurrentTimeElapsed());
        },
        getCoordinates(){
            return helpers.coordinates(this.getCurrentAngle(), this.length);
        },
        isStopped(){
            return this.timer.isStopped();
        },
        getDrawInfo(){ // returns info needed to draw
            const coordinates = this.getCoordinates();
            return {
                length: this.length,
                x: coordinates.x,
                y: coordinates.y,
                time: this.getCurrentTimeElapsed(),
                angle: this.getCurrentAngle(),
                stopped: this.isStopped()
            };
        },
        setLength(length){
            this.length = length;
        },
        setInitialAngle(initialAngle){
            this.initialAngle = initialAngle;
        },
        set(attributes){
            if (attributes['length']) this.setLength(attributes.length);
            if (attributes['initialAngle']) this.setInitialAngle(attributes.initialAngle);
        },
        get(){
            return this;
        },
        getNeighbours(){
            if(pendulumNumber - 1 <= 0) return [pendulumNumber+1];
            if(pendulumNumber + 1 > numberOfPendulums) return [pendulumNumber-1];
            return [pendulumNumber-1,pendulumNumber+1];
        },
        getNeighbouringPendulums(){
            const neighbours = this.getNeighbours();
            let neighbouringPendulums = [];
            for (const neighbour of neighbours){
                console.log("Neighbour: ", neighbour);
            } 
            return neighbours;
        }
    })
}
