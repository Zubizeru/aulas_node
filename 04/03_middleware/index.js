const express = require('express'); // Importando o módulo express
const app = express(); // Criando uma instância do express
const port = 3000;
const path = require('path');
const basePath = path.join(__dirname, 'frontend');

app.use(express.urlencoded({ extended: true })); // Middleware para interpretar dados de formulários
app.use(express.json()); // Middleware para interpretar JSON

var checkAuth = function(req, res, next) {
    req.authStatus = true; 
    if (req.authStatus) {
        console.log('Usuário autenticado com sucesso!'); 
        next()
    }
    else {
        console.log('Usuário não autenticado!'); 
    }
}

app.use(checkAuth); // Usando o middleware checkAuth para todas as rotas

app.post('/users/save', (req, res) => {
    console.log(req.body); 
    const name = req.body.name;
    const age = req.body.age; 
    console.log(`O nome do usuário é ${name} e a idade é ${age}`);
});

app.get('/users/add', (req, res) => {
    console.log('Carregando formulário de usuário');
    res.sendFile(`${basePath}/userform.html`);
});

app.get('/users/:id', (req, res) => {
    console.log(`Carregando usuário: ${req.params.id}`);
    res.sendFile(`${basePath}/users.html`);
});

app.get('/', (req, res) => { // Rota para a raiz do servidor
    res.sendFile(`${basePath}/index.html`); // Enviando o arquivo index.html como resposta
});

app.listen(port, () => {
    console.log(`Rodando no endereço http://localhost:${port}`);
});