const http = require('http');
var x = require('./pendulum');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    x.test('Another test');
});

const server2 = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('A second server');
    x.test('This is a test');
});

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});

server2.listen(port+1, hostname, () =>{
    console.log(`Server2 running at http://${hostname}:${port+1}/`);
});

