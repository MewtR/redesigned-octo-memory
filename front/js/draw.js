$(document).ready(function(){
    
   
const canvas = $("#pendulum1");
const ctx = canvas[0].getContext('2d');
ctx.save();
//console.log("First context is: ",ctx);
ctx.beginPath();
//coordinate system at the center of the circle
ctx.translate(150,75);
ctx.rotate(2*Math.PI*(3/4));
ctx.arc(0, 0, 10, 0 ,2*Math.PI);
ctx.lineTo(150,0);
ctx.stroke();
ctx.restore();


const canvas2 = $("#pendulum2");
const ctx2 = canvas2[0].getContext('2d');
ctx2.beginPath();
//coordinate system at the center of the circle
ctx2.translate(150,75);
ctx2.rotate(2*Math.PI*(3/4));
ctx2.arc(0, 0, 10, 0 ,2*Math.PI);
ctx2.lineTo(150,0);
ctx2.stroke();

})

// functions defined here can be called from other script
function draw(pendulumNumber, length, x, y, time = 0, angle = 0){
    const radius = 10;
    const canvas = $("#pendulum"+pendulumNumber);
    const ctx = canvas[0].getContext('2d');
    //clear canvas
    ctx.clearRect(0,0, canvas[0].width, canvas[0].height);
    //Restoring context at the end of every draw allows to use to 
    // more easily set the point of origin to the pendulum at rest and 
    // also more easily clear the  previous drawings
    ctx.save();
    const canvasXMidpoint = Math.round(canvas[0].width * 0.5);
    const canvasYMidpoint = Math.round(canvas[0].height * 0.5);
    const lengthInPixels = convertMetersToPixels(length);
    const xInPixels = convertMetersToPixels(x);
    const yInPixels = convertMetersToPixels(y);
    console.log("x,y in pixels: "+x+","+y+" "+xInPixels+","+yInPixels+ " time: "+time+" angle: "+angle);
    ctx.beginPath();
    // Set origin to middle of the pendulum at rest
    ctx.translate(canvasXMidpoint, lengthInPixels);
    ctx.scale(1,-1); // flip the y axis 
    
    //Draws an arc which is centered at xInPixels,yInPixels
    ctx.arc(xInPixels, yInPixels, radius, 0, 2*Math.PI);
    ctx.moveTo(xInPixels, yInPixels + radius);
    ctx.lineTo(0,lengthInPixels);
    ctx.stroke();
    ctx.restore();

}
function simulate(pendulumNumber){
  const intervalID = setInterval(() =>{
            let nodeUrl = "http://localhost:300"+pendulumNumber; 
            $.get(nodeUrl+'/drawinfo', (data) => {
                draw(pendulumNumber, data.length, data.x, data.y,data.time, data.angle);
                if(data.stopped) clearInterval(intervalID);
            }).fail(() =>{
                clearInterval(intervalID);
            });
  }, 100, pendulumNumber, length)  
}
function convertMetersToPixels(length){
    return Math.round((length*96*100)/2.54);
}
