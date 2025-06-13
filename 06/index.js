// =======================
// IMPORTAÇÕES E CONFIGURAÇÕES INICIAIS
// =======================
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

// Configura o Handlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middlewares para interpretar dados de formulários e JSON
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'))

// =======================
// ROTAS PRINCIPAIS
// =======================

// Rota inicial (home)
app.get('/', function (req, res) {
  res.render('home')
})

// =======================
// CRUD - CREATE
// =======================

// Rota para inserir um novo filme
app.post('/movies/insertmovie', function (req, res) {
  const { title, director, year, genre, duration } = req.body

  const query = "INSERT INTO movies (title, director, year, genre, duration) VALUES (?, ?, ?, ?, ?)"

  conn.query(query, [title, director, year, genre, duration], function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/movies')
  })
})

// =======================
// CRUD - READ (LISTAR TODOS)
// =======================

// Rota para listar todos os filmes
app.get('/movies', function (req, res) {
  const query = "SELECT * FROM movies"

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    res.render('movies', { movies: data })
  })
})

// =======================
// CRUD - READ (DETALHE)
// =======================

// Rota para exibir detalhes de um filme pelo id
app.get('/movies/:id', function (req, res) {
  const id = req.params.id

  const query = "SELECT * FROM movies WHERE id = ?"

  conn.query(query, [id], function (err, data) {
    if (err) {
      console.log(err)
    }
    const movie = data[0]
    res.render('movie', { movie })
  })
})

// =======================
// CRUD - UPDATE (EXIBIR FORMULÁRIO)
// =======================

// Rota para exibir o formulário de edição de um filme
app.get('/movies/edit/:id', function (req, res) {
  const id = req.params.id

  const query = "SELECT * FROM movies WHERE id = ?"

  conn.query(query, [id], function (err, data) {
    if (err) {
      console.log(err)
    }
    const movie = data[0]
    res.render('editmovie', { movie })
  })
})

// =======================
// CRUD - UPDATE (SALVAR ALTERAÇÕES)
// =======================

// Rota para atualizar os dados de um filme
app.post('/movies/updatemovie', function (req, res) {
  const { id, title, director, year, genre, duration } = req.body

  const query = "UPDATE movies SET title = ?, director = ?, year = ?, genre = ?, duration = ? WHERE id = ?"

  conn.query(query, [title, director, year, genre, duration, id], function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/movies')
  })
})

// =======================
// CRUD - DELETE
// =======================

// Rota para remover um filme pelo id
app.post('/movies/remove/:id', function (req, res) {
  const id = req.params.id

  const query = "DELETE FROM movies WHERE id = ?"

  conn.query(query, [id], function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/movies')
  })
})

// =======================
// CONEXÃO COM O BANCO DE DADOS
// =======================

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysqlmovies',
})

// Inicia o servidor apenas após conectar ao banco
conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectado ao MySQL!')

  app.listen(3000)
})