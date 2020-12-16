$(document).ready(function(){
let node1Url = "http://localhost:3000"
let d = new Date();
$( "h2" ).text("Today's date is "+d);


$( "#node1" ).click(() => {
    $.get(node1Url, (data) => {
        console.log("Here is my data: "+data);
    })
});

const canvas = $("#pendulum1");
console.log("Canvas is: ", canvas);
const ctx = canvas[0].getContext('2d');
ctx.beginPath();
ctx.arc(150, 75, 10, -0.5*Math.PI ,2*Math.PI*(3/4));
ctx.lineTo(150,0);
ctx.stroke();
})
