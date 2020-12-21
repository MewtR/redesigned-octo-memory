$(document).ready(function(){
let pendulums = "";

    //Generate pendulum canvases
    for (let i = 1; i < 6; i ++){
        pendulums += "<div class='d-flex flex-column justify-content-center align-items-center'>";
        pendulums += "<p class='mb-0 mt-3'>pendulum #" + i+ "</p>";
        pendulums += "<canvas id='pendulum"+i+"' class='mt-3 border-top border-dark' width='400' height='300'></canvas>";
        pendulums += "<div class='d-flex flex-column'>";
        pendulums += "<div class='d-flex flex-row flex-wrap'>";
        //pendulums += "<button id='start"+i+"'>Start</button>";
        pendulums += "<button type='button' class='btn btn-primary mx-1' id='stop"+i+"'>Stop</button>";
        //pendulums += "<button id='time"+i+"'>Time</button>";
        //pendulums += "<button id='angle"+i+"'>Angle</button>";
        pendulums += "<button class='btn btn-primary mx-1' id='simulate"+i+"'>Simulate</button>";
        pendulums += "<button class='btn btn-primary mx-1' id='python"+i+"'>Generate Python</button>";
        pendulums += "</div>";
        //pendulums += "<button id='coordinates"+i+"'>Coordinates</button>";
        //pendulums += "<button id='drawinfo"+i+"'>Drawing Information</button>";
        pendulums += "</div>";

        //Form to input info
        pendulums += "<form class='mt-3' id='form"+i+"'>"
        pendulums += "<div class='form-group'>"
        pendulums += "<label for='length"+i+"'>Length</label>"
        pendulums += "<input class='form-control' type='number' step=0.1 min=0.3 max=10 name='length"+i+"' id='length"+i+"'>"
        pendulums += "<small class='form-text text-muted'>in m </small>"
        pendulums += "</div>"
        pendulums += "<div class='form-group'>"
        pendulums += "<label for='initangle"+i+"'>Initial Angle</label>"
        pendulums += "<input class='form-control' type='number' step=0.1 min=-90 max=90 name='initangle"+i+"' id='initangle"+i+"'>"
        pendulums += "<small class='form-text text-muted'>in degrees </small>"
        pendulums += "</div>"
        pendulums += "<div class='form-group'>"
        pendulums += "<label for='mass"+i+"'>Mass</label>"
        pendulums += "<input class='form-control' type='number' step=0.1 min=0.1 max=25 name='mass"+i+"' id='mass"+i+"'>"
        pendulums += "<small class='form-text text-muted'>in kg </small>"
        pendulums += "</div>"
        pendulums += "<div class='form-group'>"
        pendulums += "<label for='proportionalityConstant"+i+"'>Proportionality Constant</label>"
        pendulums += "<input class='form-control' type='number' step=0.1 min=0.1 max=50 name='proportionalityConstant"+i+"' id='proportionalityConstant"+i+"'>"
        pendulums += "</div>"
        pendulums += "<div>"
        pendulums += "<input class='mt-3' type='submit' value='Set'>"
        pendulums += "</div>"
        pendulums += "</form>"
        pendulums += "</div>";
    }

$( "#pendulums" ).html(pendulums);

    //Event listeners
    for (let i = 1; i < 6; i ++){
        //$( "#start"+i ).click(() => { start(i); });
        $( "#stop"+i ).click(() => { stop(i); });
        //$( "#time"+i ).click(() => { time(i); });
        //$( "#angle"+i ).click(() => { angle(i); });
        //$( "#coordinates"+i ).click(() => { coordinates(i); });
        //$( "#drawinfo"+i ).click(() => { drawinfo(i); });
        $( "#simulate"+i ).click(() => { simulate(i); });
        $( "#form"+i ).submit((event) => {
            set(i);
            event.preventDefault();
        });
        $( "#python"+i ).click(() => { python(i); });
    }


})

function getNodeUrl(i){
    return "http://localhost:300"+i;
}
//Set attributes
function set(i){
    const body = {
        length: parseFloat($( "#length"+i ).val()),
        initialAngle: parseFloat($( "#initangle"+i ).val()),
        mass: parseFloat($( "#mass"+i ).val()),
        proportionalityConstant: parseFloat($( "#proportionalityConstant"+i ).val()),
    }
    $.post(getNodeUrl(i)+"/set", JSON.stringify(body), (data) =>{
        draw(i, data.length, data.x, data.y);
    }).fail((err) =>{
        alert(err.responseText);
    });
}
// Start pendulum
function start(i, callback){
  $.get(getNodeUrl(i)+'/start', (data) => {
      console.log("Response: "+data);
      callback(i);
  }).fail((err) =>{
      console.log("Full error ", err);
      alert(err.responseText);
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
function python(i){
$.get(getNodeUrl(i)+'/python', (data) => {
    console.log("Python script generation successful");
}).fail((err) =>{
    alert(err.responseText);
})
}
