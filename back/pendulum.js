const Timer = require('./timer');
const helpers = require('./helpers');
const http = require('http');
module.exports = {
    createPendulum: (pendulumNumber, numberOfPendulums = 5, initialAngle, length, mass, wind, timer = Timer.createTimer(), neighbouringPendulums = []) => ({
        pendulumNumber,
        initialAngle,
        length,
        mass,
        wind,
        timer,
        numberOfPendulums,
        neighbouringPendulums,
        start(){
            if (this.checkIfSafeToStart()){
            this.timer.start();
                return true;
            }else return false;
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
        setWind(wind){
            this.wind = wind;
        },
        setMass(mass){
            this.mass = mass;
        },
        set(attributes){
            if (attributes['length']) {
                this.setLength(attributes.length);
            }
            if (attributes['initialAngle']){ 
                this.setInitialAngle(attributes.initialAngle);
            }
            if (attributes['wind']){ 
                this.setWind(attributes.wind);
            }
            if (attributes['mass']){ 
                this.setMass(attributes.mass);
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
        },
        checkIfSafeToStart(){
            if (this.length === 0) return false;
            if (this.initialAngle == null) return false;
            //If you have wind, you must have mass
            if ((this.wind == null && this.mass != null) || (this.wind  != null && this.mass == null)) return false;
            return true;
        }
    })
}
