const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    fs.readFile("mensagem.html", "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write(data);
        res.end();
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});