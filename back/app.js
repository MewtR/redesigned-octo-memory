const http = require('http');
const Timer = require('./timer');
const Pendulum = require('./pendulum');


const hostname = '127.0.0.1';
const port = 3001;

const timer1 = Timer.createTimer();
const timer2 = Timer.createTimer();
//const pendulum1 = new Pendulum(5, 0.03, timer1);

const sendResponse = function(res, statusCode, contentType, data){
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(data);
}
const requestListener = function(req, res, pendulum){
    const url = req.url;
    if (url == '/start'){
        pendulum.start();
        sendResponse(res, 200, 'text/plain', 'Timer started');
    }else if(url == '/stop'){
        pendulum.stop();
        sendResponse(res, 200, 'text/plain', 'Timer stopped');
    }else if( url == '/time'){
        sendResponse(res, 200, 'text/plain', 'Current time elapsed is '+String(pendulum.getCurrentTimeElapsed()));
    }else{
        sendResponse(res, 200, 'text/plain', '');
    }
}

const server = http.createServer((req,res) =>{
    requestListener(req,res,timer1);
}).listen(port, hostname, () =>{
    console.log(`Pendulum running at http://${hostname}:${port}/`);
});

const server2 = http.createServer((req, res) =>{
    requestListener(req,res,timer2);
}).listen(port+1, hostname, () =>{
    console.log(`Pendulum running at http://${hostname}:${port+1}/`);
});
