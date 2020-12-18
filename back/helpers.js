module.exports = {
    angularDisplacement: function(initialAngle, length, time){
        const gravitationalAcceleration = 9.8;
        const initialAngleInRads = toRadians(initialAngle);
        /*
        console.log("Time is: ", Math.round(time/1000));
        const squirt = Math.sqrt(gravitationalAcceleration/length);
        console.log("squirt: ", squirt);
        const multiplied = squirt*(Math.round(time/1000));
        console.log("multiplied: ", multiplied);
        const sinm = Math.sin(multiplied);
        console.log("sinm: ", sinm);
        const result = sinm*initialAngleInRads;
        console.log("result in rads: ", result);
        console.log("result in degs: ", toDegrees(result));
        */
        const angle = toDegrees( initialAngleInRads * Math.sin( (Math.sqrt( gravitationalAcceleration/length ))*( Math.round(time/1000) ) ));
        console.log("Angle is: ", angle);

        return angle;
    },
    coordinates: function(angle, length){
        console.log("Length is: ", length);
        console.log("Angle in degs: ", angle);
        const angleInRads = toRadians(angle);
        console.log("Angle in rads:  ",  angleInRads);
        const x = length*Math.sin(angleInRads);
        const y = length - length*Math.cos(angleInRads);
        console.log("x is: "+x +" and y is: "+y);
        return {x, y};
    }
}
function toRadians(angle){
    return angle * (Math.PI/180);
}
function toDegrees(angle){
    return angle * (180 / Math.PI);
}
