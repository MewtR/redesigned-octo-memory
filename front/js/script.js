$(document).ready(function(){
let pendulums = "";

    //Generate pendulum canvases
    for (let i = 1; i < 3; i ++){
        pendulums += "<div class='d-flex flex-column'>";
        pendulums += "<canvas id='pendulum"+i+"' class='mt-3 border-top border-dark' width='300' height='300'></canvas>";
        pendulums += "<div class='d-flex flex-column'>";
        pendulums += "<div class='d-flex flex-row flex-wrap'>";
        pendulums += "<button id='start"+i+"'>Start</button>";
        pendulums += "<button id='stop"+i+"'>Stop</button>";
        pendulums += "<button id='time"+i+"'>Time</button>";
        pendulums += "<button id='angle"+i+"'>Angle</button>";
        pendulums += "</div>";
        pendulums += "<button id='coordinates"+i+"'>Coordinates</button>";
        pendulums += "<button id='drawinfo"+i+"'>Drawing Information</button>";
        pendulums += "<button id='simulate"+i+"'>Simulate</button>";
        pendulums += "</div>";


        //Form to input info
        pendulums += "<form id='form"+i+"'>"
        pendulums += "<div>"
        pendulums += "<label for='length"+i+"'>Length in m </label>"
        pendulums += "</div>"
        pendulums += "<div>"
        pendulums += "<input type='number' step=0.01 min=0.03 max=10 name='length"+i+"' id='length"+i+"'>"
        pendulums += "</div>"
        pendulums += "<div>"
        pendulums += "<label for='initangle"+i+"'>Initial Angle </label>"
        pendulums += "</div>"
        pendulums += "<div>"
        pendulums += "<input type='number' step=0.01 min=1 max=90 name='initangle"+i+"' id='initangle"+i+"'>"
        pendulums += "</div>"
        pendulums += "<div>"
        pendulums += "<input type='submit' value='Set'>"
        pendulums += "</div>"
        pendulums += "</form>"
        pendulums += "</div>";
    }

$( "#pendulums" ).html(pendulums);

    //Event listeners
    for (let i = 1; i < 3; i ++){
        $( "#start"+i ).click(() => { start(i); });
        $( "#stop"+i ).click(() => { stop(i); });
        $( "#time"+i ).click(() => { time(i); });
        $( "#angle"+i ).click(() => { angle(i); });
        $( "#coordinates"+i ).click(() => { coordinates(i); });
        $( "#drawinfo"+i ).click(() => { drawinfo(i); });
        $( "#simulate"+i ).click(() => { simulate(i); });
        $( "#form"+i ).submit((event) => {
            set(i);
            event.preventDefault();
        });
    }

let d = new Date();
$( "h2" ).text("Today's date is "+d);
})

function getNodeUrl(i){
    return "http://localhost:300"+i;
}
//Set attributes
function set(i){
    const body = {
        length: parseFloat($( "#length"+i ).val()),
        initialAngle: parseFloat($( "#initangle"+i ).val())
    }
    $.post(getNodeUrl(i)+"/set", JSON.stringify(body), (data) =>{
        draw(i, data.length, data.x, data.y);
    });
}
// Start pendulum
function start(i){
  $.get(getNodeUrl(i)+'/start', (data) => {
      console.log("Response: "+data);
  })
}
// Stop pendulum
function stop(i){
$.get(getNodeUrl(i)+'/stop', (data) => {
    console.log("Response: "+data);
})
}
// Get time elapsed
function time(i){
$.get(getNodeUrl(i)+'/time', (data) => {
    console.log("Response: "+data);
})
}
// Get current angle
function angle(i){
$.get(getNodeUrl(i)+'/angle', (data) => {
    console.log("Response: "+data);
})
}
// Get current coordinates
function coordinates(i){
$.get(getNodeUrl(i)+'/coordinates', (data) => {
    console.log("Response is: ",data);
    console.log("x is: ",data.x);
    console.log("y is: ",data.y);
})
}
// Get info need to draw pendulum
function drawinfo(i){
$.get(getNodeUrl(i)+'/drawinfo', (data) => {
    console.log("Response is: ",data);
    console.log("x is: ",data.x);
    console.log("y is: ",data.y);
    draw(i, data.length, data.x, data.y);
})
}
