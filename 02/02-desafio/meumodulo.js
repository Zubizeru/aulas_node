const { soma } = require("../01-modulo-interno/meumodulo");

module.exports = {
    multiplicar(a, b) {
        return console.log(a * b);
    },

    dividir(a, b) {
        if (b === 0) {
            return console.log('Divisão por zero não é permitida.');
        }
        return console.log(a / b);
    },

    soma(a, b) {
        return console.log(a + b);
    },

    subtrair(a, b) {
        return console.log(a - b);
    }
}