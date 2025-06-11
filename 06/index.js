// Declarando variáveis e importando módulos necessários
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const app = express()

// Configurando o Express para usar o Handlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middleware para interpretar dados de formulários
app.use(
    express.urlencoded({
        extended: true
    }),
)
// Middleware para interpretar JSON
app.use(express.json())

// Permite servir arquivos estáticos, como CSS,imagens e JavaScript
app.use(express.static('public'))

// Middleware para interpretar JSON
app.get('/', function (req, res) {
    res.render('home')
})

// Rota para listar os livros
app.post('/books/insertbook', function (req, res) {
  const title = req.body.title
  const pageqty = req.body.pageqty
 
  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`
 
  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }
 
    res.redirect('/')
  })
})

// Rota para inserir um livro
app.get('/books', function (req, res) {
  const query = `SELECT * FROM books`
 
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
 
    const books = data
 
    console.log(data)
 
    res.render('books', { books })
  })
})

// Rota para exibir detalhes de um livro específico 
app.get('/books/:id', function (req, res) {
  const id = req.params.id
 
  const query = `SELECT * FROM books WHERE id = ${id}`
 
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
 
    const book = data[0]
 
    console.log(data[0])
 
    res.render('book', { book })
  })
})

// Rota para listar os usuários
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Tratando erro de conexao no MySQL
conn.connect(function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Conectado ao MySQL!');

    app.listen(3000)
});

