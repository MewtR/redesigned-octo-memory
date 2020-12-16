const http = require('http');
var x = require('./pendulum');
const Timer = require('./timer');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) =>{
    const timer = new Timer();
    timer.start();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write(String(timer.getCurrentTimeElapsed()));
    res.end(x.test('Another test'));
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

