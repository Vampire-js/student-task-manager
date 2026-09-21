const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicFiles = {
    '/': 'index.html',
    '/index.html': 'index.html',
    '/app.css': 'app.css',
    '/app.js': 'app.js'
};

const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8'
};

const server = http.createServer((request, response) => {
    const fileName = publicFiles[request.url];

    if (!fileName) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
    }

    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Could not load application file');
            return;
        }

        response.writeHead(200, {
            'Content-Type': contentTypes[path.extname(fileName)]
        });
        response.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});