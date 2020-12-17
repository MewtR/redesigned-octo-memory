$(document).ready(function(){

let pendulums = "";

    //Generate pendulum canvases
    for (let i = 1; i < 3; i ++){
        pendulums += "<div class='d-flex flex-column'>";
        pendulums += "<canvas id='pendulum"+i+"' class='mt-3 border-top border-dark'></canvas>";
        pendulums += "<div class='d-flex flex-column'>";
        pendulums += "<button id='node"+i+"'>Main</button>";
        pendulums += "<button id='start"+i+"'>Start</button>";
        pendulums += "<button id='stop"+i+"'>Stop</button>";
        pendulums += "<button id='time"+i+"'>Time</button>";
        pendulums += "<button id='angle"+i+"'>Angle</button>";
        pendulums += "<button id='coordinates"+i+"'>Coordinates</button>";
        pendulums += "</div>";
        pendulums += "</div>";
    }

$( "#pendulums" ).html(pendulums);

    //Event listeners
    for (let i = 1; i < 3; i ++){
        let nodeUrl = "http://localhost:300"+i;
        $( "#node"+i ).click(() => {
            $.get(nodeUrl, (data) => {
                console.log("Here is my data: "+data);
            })
        });
        $( "#start"+i ).click(() => {
            $.get(nodeUrl+'/start', (data) => {
                console.log("Response: "+data);
            })
        });
        $( "#stop"+i ).click(() => {
            $.get(nodeUrl+'/stop', (data) => {
                console.log("Response: "+data);
            })
        });
        $( "#time"+i ).click(() => {
            $.get(nodeUrl+'/time', (data) => {
                console.log("Response: "+data);
            })
        });
        $( "#angle"+i ).click(() => {
            $.get(nodeUrl+'/angle', (data) => {
                console.log("Response: "+data);
            })
        });
        $( "#coordinates"+i ).click(() => {
            $.get(nodeUrl+'/coordinates', (data) => {
                console.log("Response is: ",data);
                console.log("x is: ",data.x);
                console.log("y is: ",data.y);
            })
        });
    }

let d = new Date();
$( "h2" ).text("Today's date is "+d);


//Put this in a separate file at some point
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
