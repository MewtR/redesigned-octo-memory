module.exports = {
    angularDisplacement: function(initialAngle, length, time){
        let gravitationalAcceleration = 9.8;
        return initialAngle * Math.sin(Math.sqrt(gravitationalAcceleration/length)*time);
    },
    coordinates: function(angle, length){
        return [length*Math.sin(angle), length - length*Math.cos(angle)];
    }
}
