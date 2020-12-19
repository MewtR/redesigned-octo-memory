const Timer = require('./timer');
const helpers = require('./helpers');
module.exports = {
    createPendulum: (initialAngle = 20, length = 0.03, timer = Timer.createTimer()) => ({

        initialAngle,
        length,
        timer,
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
        }
    })
}
