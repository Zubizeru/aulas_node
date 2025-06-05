const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    req.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Hello,World!</h1></body></html>');
    res.end();
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});