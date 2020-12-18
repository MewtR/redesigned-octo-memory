module.exports = {
    angularDisplacement: function(initialAngle, length, time){
        const gravitationalAcceleration = 9.8;
        const initialAngleInRads = toRadians(initialAngle);
        const angle = toDegrees( initialAngleInRads * Math.sin( (Math.sqrt( gravitationalAcceleration/length ))*( time/1000 ) ));
        return angle;
    },
    coordinates: function(angle, length){
        const angleInRads = toRadians(angle);
        const x = length*Math.sin(angleInRads);
        const y = length - length*Math.cos(angleInRads);
        return {x, y};
    }
}
function toRadians(angle){
    return angle * (Math.PI/180);
}
function toDegrees(angle){
    return angle * (180 / Math.PI);
}
