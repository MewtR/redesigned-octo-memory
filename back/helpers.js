module.exports = {
    angularDisplacement: function(initialAngle, length, time){
        let gravitationalAcceleration = 9.8;
        const angle = initialAngle * Math.sin(Math.sqrt(gravitationalAcceleration/length)*(time/1000));

        return angle;
    },
    coordinates: function(angle, length){
        const x = length*Math.sin(angle);
        const y = length - length*Math.cos(angle);
        return {x, y};
    }
}
