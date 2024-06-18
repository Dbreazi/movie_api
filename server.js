const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
    let addr = request.url;
    let q = new URL(addr, 'http://' + request.headers.host);
    let filePath = '';

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    if (q.pathname.includes('documentation')) {
        filePath = __dirname + '/documentation.html';
    } else {
        filePath = __dirname + '/index.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.write('Internal Server Error');
            response.end();
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');