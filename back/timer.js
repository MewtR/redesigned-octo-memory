module.exports = { 
    createTimer : (currentTimeElapsed = null, startTime = null, stopped = true) =>  ({
        currentTimeElapsed,
        startTime,
        stopped,
        start(){
            this.stopped = false;
            this.startTime = Date.now();
        },
        stop(){
            if (this.stopped) return;
            this.stopped = true;
            if (!this.startTime) return;
            if (this.currentTimeElapsed)
                this.currentTimeElapsed = this.currentTimeElapsed + (Date.now() - this.startTime);
            else
                this.currentTimeElapsed = (Date.now() - this.startTime);
        },
        getCurrentTimeElapsed(){
            if (!this.startTime) return 0;
            if (this.currentTimeElapsed)
                if (this.stopped)
                    return this.currentTimeElapsed;
                else
                    return this.currentTimeElapsed + (Date.now() - this.startTime);
            else 
                if (this.stopped) return 0;
                return Date.now() - this.startTime;
        },
        isStopped(){
            return this.stopped;
        },
        reset(){
            this.currentTimeElapsed = null;
            this.startTime = null;
            this.stopped = true;
        }
    })
    }
