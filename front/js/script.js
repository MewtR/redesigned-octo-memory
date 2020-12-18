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
        pendulums += "<button id='drawinfo"+i+"'>Drawing Information</button>";
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
        $( "#drawinfo"+i ).click(() => {
            $.get(nodeUrl+'/drawinfo', (data) => {
                console.log("Response is: ",data);
                console.log("x is: ",data.x);
                console.log("y is: ",data.y);
                draw(i, data.length, data.x, data.y);
            })
        });
    }

let d = new Date();
$( "h2" ).text("Today's date is "+d);
})
