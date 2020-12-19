const Timer = require('./timer');
const helpers = require('./helpers');
const http = require('http');
module.exports = {
    createPendulum: (pendulumNumber, numberOfPendulums = 5,initialAngle = 20, length = 0.03, timer = Timer.createTimer(), neighbouringPendulums = []) => ({
        pendulumNumber,
        initialAngle,
        length,
        timer,
        numberOfPendulums,
        neighbouringPendulums,
        start(){
            this.timer.start();
        },
        stop(){
            this.timer.stop();
        },
        reset(){
            this.timer.reset();
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
            if (attributes['length']) {
                this.setLength(attributes.length);
            }
            if (attributes['initialAngle']){ 
                this.setInitialAngle(attributes.initialAngle);
            }
            this.reset();
            const coordinates = this.getCoordinates();
            return({
                ...this,
                x: coordinates.x,
                y: coordinates.y
            })
        },
        get(){
            return this;
        },
        // Returns array of numbers representing the pendulum numbers of neighbours
        getNeighbours(){
            if(pendulumNumber - 1 <= 0) return [pendulumNumber+1];
            if(pendulumNumber + 1 > numberOfPendulums) return [pendulumNumber-1];
            return [pendulumNumber-1,pendulumNumber+1];
        },
        getNeighbouringPendulums(){
            return this.neighbouringPendulums;
        },
        setNeighbours(neighbouringPendulums){
            this.neighbouringPendulums = neighbouringPendulums;
        },
        getPendulumNumber(){
            return this.pendulumNumber;
        },
        checkEqualAttributes(attributes){
            let equal = [];
            for (const [key, value] of Object.entries(attributes)){
                for (neighbour of this.neighbouringPendulums){
                    if (neighbour[key] === value && !equal.includes(key)) equal.push(key);
                }
            }
            return equal;
        }
    })
}
