const http = require('http');
var x = require('./pendulum');
const Timer = require('./timer');

const hostname = '127.0.0.1';
const port = 3000;

const timer = new Timer();
// Seriously need to figure out how to duplicate this code
const server = http.createServer((req, res) =>{
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end();
    //res.end(x.test('Another test'));
    }
});

const server2 = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(x.test('This is a test'));
});

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});

server2.listen(port+1, hostname, () =>{
    console.log(`Server2 running at http://${hostname}:${port+1}/`);
});

