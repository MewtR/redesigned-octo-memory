$(document).ready(function(){
const canvas = $("#pendulum1");
const ctx = canvas[0].getContext('2d');
ctx.beginPath();
//coordinate system at the center of the circle
ctx.translate(150,75);
ctx.rotate(2*Math.PI*(3/4));
ctx.arc(0, 0, 10, 0 ,2*Math.PI);
ctx.lineTo(150,0);
ctx.stroke();
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
