module.exports = {
    angularDisplacement: function(initialAngle, length, time){
        const gravitationalAcceleration = 9.8;
        const initialAngleInRads = toRadians(initialAngle);
        const angle = toDegrees( initialAngleInRads * Math.cos( (Math.sqrt( gravitationalAcceleration/length ))*( time/1000 ) ));
        return angle;
    },
    coordinates: function(angle, length){
        const angleInRads = toRadians(angle);
        const x = length*Math.sin(angleInRads);
        const y = length - length*Math.cos(angleInRads);
        return {x, y};
    },
    dampedAngularDisplacement: function(initialAngle, length, time, mass, proportionalityConstant){
        const gravitationalAcceleration = 9.8;
        const initialAngleInRads = toRadians(initialAngle);
        const dampingCoefficient = proportionalityConstant/(2*mass);
        const gOverL = gravitationalAcceleration/length;
        const b2Over4m2 = (Math.pow(proportionalityConstant,2))/(4*Math.pow(mass,2));
        const angularFrequencyPrime = Math.sqrt(gOverL-b2Over4m2);
        const e = Math.pow(Math.E, -dampingCoefficient*(time/1000));
        const angle = toDegrees(initialAngleInRads * e * Math.cos(angularFrequencyPrime*(time/1000)));
        return angle;
    }
}
function toRadians(angle){
    return angle * (Math.PI/180);
}
function toDegrees(angle){
    return angle * (180 / Math.PI);

}
