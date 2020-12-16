$(document).ready(function(){
let node1Url = "http://localhost:3000"
let d = new Date();
$( "h2" ).text("Today's date is "+d);


$( "#node1" ).click(() => {
    $.get(node1Url, (data) => {
        console.log("Here is my data: "+data);
    })
});
})
