const http = require('http');
var x = require('./pendulum');
const Timer = require('./timer');

const hostname = '127.0.0.1';
const port = 3001;

const timer1 = new Timer();
const timer2 = new Timer();

const requestListener = function(req, res, timer){
    const url = req.url;
    if (url == '/start'){
        timer.start();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end("Timer started");
    }else if(url == '/stop'){
        timer.stop();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end("Timer stopped");
    }else if( url == '/time'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.write("Current elapsed time is: ");
        res.write(String(timer.getCurrentTimeElapsed()));
        res.end();
    }else{
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end();
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
