const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

console.log(args);

const nome = args["nome"];

console.log(`Olá, ${nome}!`);

const idade = args["idade"];
console.log(`Você tem ${idade} anos.`);

const profissao = args["profissao"];
console.log(`Você é ${profissao}.`);