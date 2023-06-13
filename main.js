var localeBR = "pt-BR";
var optionsBR = {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
var formatterBR = new Intl.NumberFormat(localeBR, optionsBR);

async function buscarValorDolar() {
  /*var myHeaders = new Headers();
  myHeaders.append("apikey", "RU9l71v1JT8PMyReZ1dK87T001CeCMhV");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  */
  //https://economia.awesomeapi.com.br/last/USD-BRL
  // compra = bid

  //https://docs.awesomeapi.com.br/api-de-moedas

  return fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
    .then((response) => response.json())
    .then((result) => {
      const valorDolar = result.USDBRL.bid;
      document.querySelector("#dolar").value = valorDolar;
      document.querySelector(
        "#dolar_hoje"
      ).innerHTML = `Dólar Hoje: ${formatterBR.format(valorDolar)}`;

      return valorDolar;
    })
    .catch((error) => console.log("error", error));
}

buscarValorDolar();

function abrir(id) {
  var cx = document.querySelector(id);
  cx.style.display = "block";
}

function fechar(id) {
  if (id == "#cx2") {
    var cx3 = document.querySelector("#cx3");
    cx3.style.display = "none";

    var cx4 = document.querySelector("#cx4");
    cx4.style.display = "none";
  }

  if (id == "#cx3") {
    var cx4 = document.querySelector("#cx4");
    cx4.style.display = "none";
  }

  var cx = document.querySelector(id);
  cx.style.display = "none";
}

function validarCampos(id) {
  var cx_produto = document.querySelector(`#cx_produto`);

  var cx_altura = document.querySelector(`#${id}_dim1`);
  var cx_largura = document.querySelector(`#${id}_dim2`);
  var cx_comprimento = document.querySelector(`#${id}_dim3`);
  var cx_peso = document.querySelector(`#${id}_peso`);

  var valido = true;

  if (cx_produto.value == "" || Number(cx_produto.value) == 0) {
    cx_produto.classList.add("is-invalid");
    valido = false;
  } else {
    cx_produto.classList.remove("is-invalid");
  }

  if (cx_altura.value == "" || Number(cx_altura.value) == 0) {
    cx_altura.classList.add("is-invalid");
    valido = false;
  } else {
    cx_altura.classList.remove("is-invalid");
  }

  if (cx_largura.value == "" || Number(cx_largura.value) == 0) {
    cx_largura.classList.add("is-invalid");
    valido = false;
  } else {
    cx_largura.classList.remove("is-invalid");
  }

  if (cx_comprimento.value == "" || Number(cx_comprimento.value) == 0) {
    cx_comprimento.classList.add("is-invalid");
    valido = false;
  } else {
    cx_comprimento.classList.remove("is-invalid");
  }

  if (cx_peso.value == "" || Number(cx_peso.value) == 0) {
    cx_peso.classList.add("is-invalid");
    valido = false;
  } else {
    cx_peso.classList.remove("is-invalid");
  }

  return valido;
}

function retornarCaixasVisiveis() {
  var caixas = ["cx1"];

  var cx2 = document.querySelector("#cx2");
  if (cx2.style.display == "block") {
    caixas.push("cx2");
  }

  var cx3 = document.querySelector("#cx3");
  if (cx3.style.display == "block") {
    caixas.push("cx3");
  }

  var cx4 = document.querySelector("#cx4");
  if (cx4.style.display == "block") {
    caixas.push("cx4");
  }

  return caixas;
}

function calcularFreteFinal() {
  var caixas = retornarCaixasVisiveis();

  var valoresFrete = [];

  caixas.forEach((cx) => {
    var valorFrete = calcularFreteIndividual(cx);
    if (valorFrete != false) {
      valoresFrete.push(valorFrete);
    }
  });

  // ordenar por preço
  valoresFrete.sort(function compare(a, b) {
    if (a.frete_dolar > b.frete_dolar) return -1;
    if (a.frete_dolar < b.frete_dolar) return 1;
    return 0;
  });

  //calculo dos percentuais por preço
  valoresFrete.map((frete, index) => {
    if (index == 1) {
      frete.frete_dolar = frete.frete_dolar * 0.6;
    }

    if (index == 2) {
      frete.frete_dolar = frete.frete_dolar * 0.5;
    }

    if (index == 3) {
      frete.frete_dolar = frete.frete_dolar * 0.4;
    }
  });

  if (valoresFrete.length > 0) {
    exibirTabelaFinal(valoresFrete);
  }
}

function exibirTabelaFinal(valoresFrete) {

  var tabela = document.querySelector("#footer");
  tabela.style.display = "block";

  //inicializacao das variáveis
  const dolar = Number(document.querySelector("#dolar").value);
  //const dolar = 5;

  // formatar em dólar e real
  var locale = "en-US";
  var options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  var formatter = new Intl.NumberFormat(locale, options);

  var valorTotal = 0;
  var valorTotalProduto = 0;

  //valor produto
  var custo_final_importacao = 0;

  document.getElementById("tabela").getElementsByTagName("tbody")[0].remove();

  document.getElementById("tabela").createTBody();

  var tbodyRef = document
    .getElementById("tabela")
    .getElementsByTagName("tbody")[0];
console.log(valoresFrete);
  valoresFrete.forEach((frete) => {
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    // Insert a cell at the end of the row
console.log(frete);
    // Caixa
    var newCellCaixa = newRow.insertCell();

    var newTextCaixa = document.createTextNode(`${frete.caixa.slice(-1)}`);
    newCellCaixa.appendChild(newTextCaixa);

    // Frete dólar
    var newCellFreteDolar = newRow.insertCell();
    var newTextFreteDolar = document.createTextNode(
      `${formatter.format(frete.frete_dolar)}`
    );
    newCellFreteDolar.appendChild(newTextFreteDolar);

    // Dólar
    /*var newCellDolar = newRow.insertCell();
    var newTextDolar = document.createTextNode(`Dólar ${dolar}`);
    newCellDolar.appendChild(newTextDolar);
*/
    // Frete R$
    var newCellFreteReal = newRow.insertCell();
    var newTextFreteReal = document.createTextNode(
      `${formatterBR.format(frete.frete_dolar * dolar)}`
    );
    newCellFreteReal.appendChild(newTextFreteReal);

    //custo_importacao

    custo_final_importacao = calcularCustoFinalImportacao(
      frete.condicao,
      frete.frete_dolar
    );

    //console.log(custo_final_importacao);
    //console.log(frete.frete_dolar, dolar);

    // Condição
    /*    var newCellCondicao = newRow.insertCell();
    var newTextCondicao = document.createTextNode(`Condição ${frete.condicao}`);
    newCellCondicao.appendChild(newTextCondicao);
*/ //
    /*var cx_frete_dolar = document.querySelector(`#${id}_frete_dolar`);
    cx_frete_dolar.innerHTML = formatter.format(valor_frete);

    var cx_frete_real = document.querySelector(`#${id}_frete_real`);
    valor_frete_real = valor_frete * dolar;
    cx_frete_real.innerHTML = formatterBR.format(valor_frete_real);
    */

    valorTotal += frete.frete_dolar;
    valorTotalProduto += custo_final_importacao;
  });

  var totalFreteDolar = document.querySelector("#total_frete_dolar");
  totalFreteDolar.innerHTML = `${formatter.format(valorTotal)}`;

  var totalFreteReal = document.querySelector("#total_frete_real");
  totalFreteReal.innerHTML = `${formatterBR.format(valorTotal * dolar)}`;

  // Produto R$
  var valor_produto = Number(document.querySelector(`#cx_produto`).value);

  var totalProdutoReal = document.querySelector("#total_produto_real");
  totalProdutoReal.innerHTML = `${formatterBR.format(valor_produto * dolar)}`;

  var totalFreteRealImportacao = document.querySelector(
    "#total_frete_real_importacao"
  );
  totalFreteRealImportacao.innerHTML = `${formatterBR.format(
    valorTotal * dolar
  )}`;

  var totalFinal = document.querySelector("#total_final");
  totalFinal.innerHTML = `${formatterBR.format(valorTotalProduto * dolar)}`;
}

function calcularFreteIndividual(id) {
  var valido = validarCampos(id);

  if (valido) {
    // pegar valores dos input
    var cx_dim1 = Number(document.querySelector(`#${id}_dim1`).value);
    var cx_dim2 = Number(document.querySelector(`#${id}_dim2`).value);
    var cx_dim3 = Number(document.querySelector(`#${id}_dim3`).value);
    var cx_peso = Number(document.querySelector(`#${id}_peso`).value);

    var cx_soma_lados = cx_dim1 + cx_dim2 + cx_dim3;
    var cx_fator_multiplicador_frete = cx_soma_lados * cx_peso;

    // inicializacao variáveis
    var valor_total = 0;
    var valor_frete = 0;
    var valor_frete_real = 0;
    var condicao = 0;

    if (cx_fator_multiplicador_frete > 0) {
      condicao = calcularCondicaoCalculo(cx_dim1, cx_dim2, cx_dim3, cx_peso);
      valor_frete = calcularValorFrete(condicao, cx_soma_lados, cx_peso);

      /*var cx_frete_dolar = document.querySelector(`#${id}_frete_dolar`);
      cx_frete_dolar.innerHTML = formatter.format(valor_frete);

      var cx_frete_real = document.querySelector(`#${id}_frete_real`);
      valor_frete_real = valor_frete * dolar;
      cx_frete_real.innerHTML = formatterBR.format(valor_frete_real);
  */
      /*
      var cx_custo_final_importacao = document.querySelector(
        `#${id}_custo_final_importacao`
      );
      cx_custo_final_importacao.innerHTML = formatterBR.format(
        custo_final_importacao
      );
        */

      //valor_total += valor_frete;

      return {
        caixa: id,
        frete_dolar: valor_frete,
        condicao: condicao,
        //custo_final_importacao: custo_final_importacao,
      };
    }
    return false;
  }
  return false;
}

function calcularValorFrete(condicao, soma_lados, peso) {
  //console.log(condicao, " soma", soma_lados, " peso", peso);

  var valor_frete = 0;
  var fator_multiplicador_frete = soma_lados * peso;

  //console.log("fator", fator_multiplicador_frete);
  if (condicao == 1) {
    //y = (3E-16x5 - 7E-12x4 + 6E-08x3 - 0.0002x2 + 0.4264x + 26.61)2
    //=((3E-016)*F5^5 - (0,000000000007)*F5^4 + (0,00000006)*F5^3 - (0,0002)*F5^2 + (0,4264)*F5 + 26,61)/2

    valor_frete =
      (0.0000000000000003 * Math.pow(fator_multiplicador_frete, 5) -
        0.000000000007 * Math.pow(fator_multiplicador_frete, 4) +
        0.00000006 * Math.pow(fator_multiplicador_frete, 3) -
        0.0002 * Math.pow(fator_multiplicador_frete, 2) +
        0.4264 * fator_multiplicador_frete +
        26.61) /
      2;

    //const resultado = ((3e-16) * Math.pow(F5, 5) - (0.000000000007) * Math.pow(F5, 4) + (0.00000006) * Math.pow(F5, 3) - (0.0002) * Math.pow(F5, 2) + (0.4264) * F5 + 26.61) / 2;
  } else if (condicao == 2) {
    //y = (3E-16x5 - 7E-12x4 + 6E-08x3 - 0.0002x2 + 0.4264x + 26.61)/1.7
    //=((3E-016)*F5^5 - (0,000000000007)*F5^4 + (0,00000006)*F5^3 - (0,0002)*F5^2 + (0,4264)*F5 + 26,61)/1,7
    valor_frete =
      (0.0000000000000003 * Math.pow(fator_multiplicador_frete, 5) -
        0.000000000007 * Math.pow(fator_multiplicador_frete, 4) +
        0.00000006 * Math.pow(fator_multiplicador_frete, 3) -
        0.0002 * Math.pow(fator_multiplicador_frete, 2) +
        0.4264 * fator_multiplicador_frete +
        26.61) /
      1.7;
    console.log("valor", valor_frete);
  } else if (condicao == 3) {
    //y = 944.5941176+((SL-200)*10)+( (Peso-30)*25 )
    valor_frete = 944.5941176 + (soma_lados - 200) * 10 + (peso - 30) * 25;
  }

  return valor_frete;
}

function calcularCondicaoCalculo(dim1, dim2, dim3, peso) {
  var alert = document.querySelector("#alert");
  alert.style.display = "none";

  var soma_lados = dim1 + dim2 + dim3;
  var condicao = 0;

  var message = "";
  //Pelo menos 1 lado acima de 100cm (ate 150cm)
  if (dim1 > 150 || dim2 > 150 || dim3 > 150) {
    message += "Valor máximo de 150cm. <br>";
  }
  //soma dos lados (SL) maior que 200cm (ate 350cm)
  if (soma_lados > 350) {
    message += "Valor máximo da soma dos lados de 350cm.<br>";
  }

  //peso maior que 30kg (ate 40kg)
  if (peso > 40) {
    message += "Peso máximo permitido de 40kg";
  }

  if (message != "") {
    alert.style.display = null;

    var msg = document.querySelector("#msg");
    msg.innerHTML = message;
  }

  //Nenhum lado com valores acima ou igual a 70cm, peso igual ou inferior 30kg
  if (dim1 < 70 && dim2 < 70 && dim3 < 70 && peso <= 30) {
    condicao = 1;
    console.log("condicao base");
  }

  //Pelo menos 1 lado com dimensao igual ou maior q 70cm, peso igual ou inferior 30kg
  if ((dim1 >= 70 || dim2 >= 70 || dim3 >= 70) && peso <= 30) {
    condicao = 2;
    console.log("condicao 1");
  }

  //Pelo menos 1 lado acima de 100cm (ate 150cm) ou soma dos lados (SL) maior que 200cm (ate 350cm) ou peso maior que 30kg (ate 40kg)
  if (dim1 > 100 || dim2 > 100 || dim3 > 100 || soma_lados > 200 || peso > 30) {
    condicao = 3;
    console.log("condicao limite");
  }

  return condicao;
}

function calcularCustoFinalImportacao(condicao, valor_frete) {
  //var valor_produto = 0;
  //custo final importacao
  var valor_produto = Number(document.querySelector(`#cx_produto`).value);

  var custo_final_importacao = 0;

  var custo_final = 0;
  var taxa = 0;

  if (condicao == 1) {
    taxa = 0.3;
  } else if (condicao == 2) {
    taxa = 0.25;
  } else if (condicao == 3) {
    taxa = 0.22;
  }

  //=(B9+C9)*0,22+C9+((B9+C9)*0,22+C9)*0,1
  custo_final =
    (valor_produto + valor_frete) * taxa +
    valor_frete +
    ((valor_produto + valor_frete) * taxa + valor_frete) * 0.1;

  return custo_final;
}
