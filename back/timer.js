module.exports = class Timer {
    currentTimeElapsed;
    startTime;
    
    start(){
        this.startTime = Date.now();
    }

    stop(){
        if (!this.startTime) return 0;
        if (this.currentTimeElapsed)
            this.currentTimeElapsed = this.currentTimeElapsed + (Date.now() - this.startTime);
        else
            this.currentTimeElapsed = (Date.now() - this.startTime);
    }

    getCurrentTimeElapsed(){
        if (!this.startTime) return 0;
        if (this.currentTimeElapsed)
            return this.currentTimeElapsed + (Date.now() - this.startTime);
        else 
            return Date.now() - this.startTime;
    }
};
