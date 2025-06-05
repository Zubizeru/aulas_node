console.log(process.argv); // Exibe os argumentos da linha de comando

const args = process.argv.slice(2); // Pega os argumentos a partir do terceiro elemento (índice 2)
console.log(args); // Exibe os argumentos restantes

const nome = args[0].split('=')[1]; // Extrai o valor do nome
const idade = args[1].split('=')[1]; // Extrai o valor da idade

console.log(`Olá, ${nome}! Você tem ${idade} anos.`); // Exibe uma mensagem personalizada com os valores fornecidos
