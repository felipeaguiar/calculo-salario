tabelaINSS = [
    { de: 0,       ate: 1045,    aliquota: 0.075 },
    { de: 1045.01, ate: 2089.60, aliquota: 0.09  },
    { de: 2089.61, ate: 3134.40, aliquota: 0.12  },
    { de: 3134.41, ate: 6101.06, aliquota: 0.14  }
]

tabelaIRPF = [
    { de: 0,       ate: 1903.98,          aliquota: 0,     parcela: 0      },
    { de: 1903.99, ate: 2826.65,          aliquota: 0.075, parcela: 142.80 },
    { de: 2826.66, ate: 3751.05,          aliquota: 0.15,  parcela: 354.80 },
    { de: 3751.06, ate: 4664.68,          aliquota: 0.225, parcela: 636.13 },
    { de: 4664.68, ate: Number.MAX_VALUE, aliquota: 0.275, parcela: 869.36 }
]

function calcularSalario() {
    var salarioBruto = obterValor();
    var valorINSS = calcularINSS(salarioBruto);
    var valorIRPF = calcularIRPF(salarioBruto, valorINSS);
    var salarioLiquido = salarioBruto - valorINSS - valorIRPF;

    escreverValores(valorINSS, valorIRPF, salarioLiquido);
}

function calcularINSS(salarioBruto) {
    var faixa = tabelaINSS.find(e => e.de <= salarioBruto && e.ate >= salarioBruto);
    var teto = tabelaINSS[tabelaINSS.length - 1];

    if (salarioBruto <= teto.ate) {
        return faixa.aliquota * salarioBruto;
    } else {
        return teto.aliquota * teto.ate;
    }
}

function calcularIRPF(salarioBruto, valorINSS) {
    var baseDeCalculo = salarioBruto - valorINSS;
    var faixa = tabelaIRPF.find(e => e.de <= baseDeCalculo && e.ate >= baseDeCalculo);
    var valor = faixa.aliquota * baseDeCalculo;
    return valor - faixa.parcela;
}

function obterValor() {
    var input = document.getElementById('salario-bruto');
    var valor = input.value.replace(/\./g, '').replace(',', '.').trim();

    if (valor) {
        return parseFloat(valor);
    } else {
        return 0;
    }
}

function escreverValores(valorINSS, valorIRPF, valorSalarioLiquido) {
    var inss = document.getElementById('inss');
    var irpf = document.getElementById('irpf');
    var salarioLiquido = document.getElementById('salario-liquido');

    inss.innerText = valorINSS.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    irpf.innerText = valorIRPF.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    salarioLiquido.innerText = valorSalarioLiquido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

String.prototype.reverse = function() {
    return this.split('').reverse().join(''); 
};

function mascaraMoeda(campo, evento) {
    var valor =  campo.value.replace(/[^\d]+/gi,'').reverse();
    var resultado = '';
    var mascara = '##.###.###,##'.reverse();

    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }

    campo.value = resultado.reverse();
}