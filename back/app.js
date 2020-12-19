const http = require('http');
const Pendulum = require('./pendulum');


const hostname = '127.0.0.1';
const port = 3000;
const numberOfPendulums = 5;

const pendulums = [Pendulum.createPendulum(1,numberOfPendulums), Pendulum.createPendulum(2,numberOfPendulums), Pendulum.createPendulum(3,numberOfPendulums),Pendulum.createPendulum(4,numberOfPendulums),Pendulum.createPendulum(5,numberOfPendulums)]; 

for(pendulum of pendulums){
    const neighbours = pendulum.getNeighbours();
    let neighbouringPendulums = [];
    for (neighbour of neighbours){
        neighbouringPendulums.push(pendulums[neighbour-1]);
    }
    pendulum.setNeighbours(neighbouringPendulums);
}

const sendResponse = function(res, statusCode, contentType, data){
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(data);
}
const requestListener = function(req, res, pendulum){
    const url = req.url;
    const method = req.method;
    if (url == '/start'){
        pendulum.start();
        sendResponse(res, 200, 'text/plain', 'Timer started');
    }else if(url == '/stop'){
        pendulum.stop();
        sendResponse(res, 200, 'text/plain', 'Timer stopped');
    }else if( url == '/time'){
        sendResponse(res, 200, 'text/plain', 'Current time elapsed is '+String(pendulum.getCurrentTimeElapsed()));
    }else if( url == '/angle'){
        sendResponse(res, 200, 'application/json',String(pendulum.getCurrentAngle()));
    }else if( url == '/coordinates'){
        sendResponse(res, 200, 'application/json',JSON.stringify(pendulum.getCoordinates()));
    }else if( url == '/drawinfo'){
        sendResponse(res, 200, 'application/json',JSON.stringify(pendulum.getDrawInfo()));
    }else if( url === '/set' && method === "POST"){
        let data = '';
        req.on('data', chunk =>{
            data += chunk;
        })
        req.on('end', ()=>{
            data = JSON.parse(data);
            const equal = pendulum.checkEqualAttributes(data);
            if(equal.length === 0){
                pendulum.set(data);
                sendResponse(res, 200, 'application/json', JSON.stringify(pendulum,replacer));
            }else{
                sendResponse(res, 400, 'text/plain', 'Two consecutive neighbours cannot have the same attributes. Please check: '+ equal.join());
            }
        })
    }else if( url == '/neighbours'){
        const neighbouringPendulums = pendulum.getNeighbouringPendulums();
        sendResponse(res, 200, 'application/json',JSON.stringify(neighbouringPendulums, replacer));
    }else if( method === 'GET' && url === '/'){
        sendResponse(res, 200, 'application/json',JSON.stringify(pendulum,replacer));
    }else{
        sendResponse(res, 200, 'text/plain', '');
    }
}

for (let i = 1; i< 6; i++){
    //const i = pendulum.getPendulumNumber();
    http.createServer((req,res) =>{
        requestListener(req,res, pendulums[i-1]);
    }).listen(port+i, hostname, () =>{
        console.log(`Pendulum ${i} running at http://${hostname}:${port+i}/`);
    });
}
function replacer(key, value){
    // ignore neighbours
    if (key === "neighbouringPendulums"){
    }else return value;
}
