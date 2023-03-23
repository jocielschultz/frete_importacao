function collapse(id) {
  var cx = document.querySelector(id);
  if (cx.style.display == "block") {
    cx.style.display = "none";
  } else {
    cx.style.display = "block";
  }
}

function calcularFrete() {
  //inicializacao das variáveis
  const dolar = Number(document.querySelector("#dolar").value);

  // formatar em dólar e real
  var locale = "en-US";
  var options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  var formatter = new Intl.NumberFormat(locale, options);

  var localeBR = "pt-BR";
  var optionsBR = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  var formatterBR = new Intl.NumberFormat(localeBR, optionsBR);

  // pegar valores dos input
  var cx1_dim1 = Number(document.querySelector("#cx1_dim1").value);
  var cx1_dim2 = Number(document.querySelector("#cx1_dim2").value);
  var cx1_dim3 = Number(document.querySelector("#cx1_dim3").value);
  var cx1_soma_lados = cx1_dim1 + cx1_dim2 + cx1_dim3;
  var cx1_peso = Number(document.querySelector("#cx1_peso").value);
  var cx1_fator_multiplicador_frete = cx1_soma_lados * cx1_peso;

  var cx2_dim1 = document.querySelector("#cx2_dim1").value;
  var cx2_dim2 = document.querySelector("#cx2_dim2").value;
  var cx2_dim3 = document.querySelector("#cx2_dim3").value;
  var cx2_peso = document.querySelector("#cx2_peso").value;
  var cx2_soma_lados = cx2_dim1 + cx2_dim2 + cx2_dim3;
  var cx2_fator_multiplicador_frete = cx2_soma_lados * cx2_peso;

  var cx3_dim1 = document.querySelector("#cx3_dim1").value;
  var cx3_dim2 = document.querySelector("#cx3_dim2").value;
  var cx3_dim3 = document.querySelector("#cx3_dim3").value;
  var cx3_peso = document.querySelector("#cx3_peso").value;
  var cx3_soma_lados = cx3_dim1 + cx3_dim2 + cx3_dim3;
  var cx3_fator_multiplicador_frete = cx3_soma_lados * cx3_peso;

  var cx4_dim1 = document.querySelector("#cx4_dim1").value;
  var cx4_dim2 = document.querySelector("#cx4_dim2").value;
  var cx4_dim3 = document.querySelector("#cx4_dim3").value;
  var cx4_peso = document.querySelector("#cx4_peso").value;
  var cx4_soma_lados = cx4_dim1 + cx4_dim2 + cx4_dim3;
  var cx4_fator_multiplicador_frete = cx4_soma_lados * cx4_peso;

  var valor_total = 0;
  var valor_frete = 0;
  var valor_frete_real = 0;
  var condicao = 0;

  //custo final importacao
  var valor_produto = 0;
  var custo_final_importacao = 0;

  if (cx1_fator_multiplicador_frete > 0) {
    condicao = calcularCondicaoCalculo(cx1_dim1, cx1_dim2, cx1_dim3, cx1_peso);
    valor_frete = calcularValorFrete(condicao, cx1_soma_lados, cx1_peso);

    var cx1_frete_dolar = document.querySelector("#cx1_frete_dolar");
    cx1_frete_dolar.innerHTML = formatter.format(valor_frete);

    var cx1_frete_real = document.querySelector("#cx1_frete_real");
    valor_frete_real = valor_frete * dolar;
    cx1_frete_real.innerHTML = formatterBR.format(valor_frete_real);

    //custo_importacao
    custo_final_importacao = calcularCustoFinalImportacao(
      condicao,
      valor_frete_real
    );

    var cx1_custo_final_importacao = document.querySelector(
      "#cx1_custo_final_importacao"
    );
    cx1_custo_final_importacao.innerHTML = formatterBR.format(
      custo_final_importacao
    );

    valor_total += valor_frete;
  }

  if (cx2_fator_multiplicador_frete > 0) {
    condicao = calcularCondicaoCalculo(cx2_dim1, cx2_dim2, cx2_dim3, cx2_peso);
    valor_frete = calcularValorFrete(condicao, cx2_soma_lados, cx2_peso);
    valor_final_importacao = calcularCustoFinalImportacao(
      condicao,
      valor_frete
    );

    valor_frete = valor_frete * 0.6;

    var cx2_frete_dolar = document.querySelector("#cx2_frete_dolar");
    cx2_frete_dolar.innerHTML = formatter.format(valor_frete);

    var cx2_frete_real = document.querySelector("#cx2_frete_real");
    valor_frete_real = valor_frete * dolar;
    cx2_frete_real.innerHTML = formatterBR.format(valor_frete_real);

    valor_total += valor_frete;
  }

  if (cx3_fator_multiplicador_frete > 0) {
    condicao = calcularCondicaoCalculo(cx3_dim1, cx3_dim2, cx3_dim3, cx3_peso);
    valor_frete = calcularValorFrete(condicao, cx3_soma_lados, cx3_peso);
    valor_final_importacao = calcularCustoFinalImportacao(
      condicao,
      valor_frete
    );

    valor_frete = valor_frete * 0.5;

    var cx3_frete_dolar = document.querySelector("#cx3_frete_dolar");
    cx3_frete_dolar.innerHTML = formatter.format(valor_frete);

    var cx3_frete_real = document.querySelector("#cx3_frete_real");
    valor_frete_real = valor_frete * dolar;
    cx3_frete_real.innerHTML = formatterBR.format(valor_frete_real);

    valor_total += valor_frete;
  }

  if (cx4_fator_multiplicador_frete > 0) {
    condicao = calcularCondicaoCalculo(cx4_dim1, cx4_dim2, cx4_dim3, cx4_peso);
    valor_frete = calcularValorFrete(condicao, cx4_soma_lados, cx4_peso);
    valor_final_importacao = calcularCustoFinalImportacao(
      condicao,
      valor_frete
    );

    valor_frete = valor_frete * 0.4;

    var cx4_frete_dolar = document.querySelector("#cx4_frete_dolar");
    cx4_frete_dolar.innerHTML = formatter.format(valor_frete);

    var cx4_frete_real = document.querySelector("#cx4_frete_real");
    valor_frete_real = valor_frete * dolar;
    cx4_frete_real.innerHTML = formatterBR.format(valor_frete_real);

    valor_total += valor_frete;
  }

  // exibe valores totais
  var frete_dolar = document.querySelector("#frete_dolar");
  frete_dolar.innerHTML = formatter.format(valor_total);

  var frete_real = document.querySelector("#frete_real");
  valor_total_real = valor_total * dolar;
  frete_real.innerHTML = formatterBR.format(valor_total_real);
}

function calcularValorFrete(condicao, soma_lados, peso) {
  var valor_frete = 0;
  var fator_multiplicador_frete = soma_lados * peso;

  if (condicao == 1) {
    //y = (3E-16x5 - 7E-12x4 + 6E-08x3 - 0.0002x2 + 0.4264x + 26.61)2
    //=((3E-016)*F5^5 - (0,000000000007)*F5^4 + (0,00000006)*F5^3 - (0,0002)*F5^2 + (0,4264)*F5 + 26,61)/2

    valor_frete =
      (0.00000000000003 * Math.pow(fator_multiplicador_frete, 5) -
        0.000000000007 * Math.pow(fator_multiplicador_frete, 4) +
        0.00000006 * Math.pow(fator_multiplicador_frete, 3) -
        0.0002 * Math.pow(fator_multiplicador_frete, 2) +
        0.4264 * fator_multiplicador_frete +
        26.61) /
      2;
  } else if (condicao == 2) {
    //y = (3E-16x5 - 7E-12x4 + 6E-08x3 - 0.0002x2 + 0.4264x + 26.61)/1.7
    //=((3E-016)*F5^5 - (0,000000000007)*F5^4 + (0,00000006)*F5^3 - (0,0002)*F5^2 + (0,4264)*F5 + 26,61)/1,7
    valor_frete =
      (0.00000000000003 * Math.pow(fator_multiplicador_frete, 5) -
        0.000000000007 * Math.pow(fator_multiplicador_frete, 4) +
        0.00000006 * Math.pow(fator_multiplicador_frete, 3) -
        0.0002 * Math.pow(fator_multiplicador_frete, 2) +
        0.4264 * fator_multiplicador_frete +
        26.61) /
      1.7;
  } else if (condicao == 3) {
    //y = 944.5941176+((SL-200)*10)+( (Peso-30)*25 )
    valor_frete = 944.5941176 + (soma_lados - 200) * 10 + (peso - 30) * 25;
  }

  return valor_frete;
}

function calcularCondicaoCalculo(dim1, dim2, dim3, peso) {
  var soma_lados = dim1 + dim2 + dim3;
  var condicao = 0;

  //Nenhum lado com valores acima ou igual a 70cm, peso igual ou inferior 30kg
  if (dim1 < 70 && dim2 < 70 && dim3 < 70 && peso <= 30) {
    condicao = 1;
  }

  //Pelo menos 1 lado com dimensao igual ou maior q 70cm, peso igual ou inferior 30kg
  if ((dim1 >= 70 || dim2 >= 70 || dim3 >= 70) && peso <= 30) {
    condicao = 2;
  }

  //Pelo menos 1 lado acima de 100cm (ate 150cm) ou soma dos lados (SL) maior que 200cm (ate 350cm) ou peso maior que 30kg (ate 40kg)
  if (dim1 > 100 || dim2 > 100 || dim3 > 100 || soma_lados > 200 || peso > 30) {
    condicao = 3;
  }

  return condicao;
}

function calcularCustoFinalImportacao(condicao, valor_frete) {
  var valor_produto = 0;
  var dolar = 5.2;

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
