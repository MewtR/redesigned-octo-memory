const http = require('http');
const Timer = require('./timer');
const Pendulum = require('./pendulum');


const hostname = '127.0.0.1';
const port = 3001;

const pendulum1 = Pendulum.createPendulum();
const pendulum2 = Pendulum.createPendulum();

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
            pendulum.setLength(data.length);
            sendResponse(res, 200, 'text/plain', 'yes');
        })
    }else{
        sendResponse(res, 200, 'text/plain', '');
    }
}

const server = http.createServer((req,res) =>{
    requestListener(req,res,pendulum1);
}).listen(port, hostname, () =>{
    console.log(`Pendulum running at http://${hostname}:${port}/`);
});

const server2 = http.createServer((req, res) =>{
    requestListener(req,res,pendulum2);
}).listen(port+1, hostname, () =>{
    console.log(`Pendulum running at http://${hostname}:${port+1}/`);
});
