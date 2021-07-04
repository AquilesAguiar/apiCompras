const LINK = "https://60e087106b689e001788cae4.mockapi.io/"
let armazenamentoLista = JSON.parse(localStorage.getItem('listaCompras'))
let armazenamentoCadastro = JSON.parse(localStorage.getItem('listaProdutos'))
let posisaoAtual = 0
armazenamentoLista.forEach(element => {
  var corpoTabela = document.getElementById('produtosLista')
    if(element.ativo === true) {
      let inputId = "inputCodigo" + element.cod
      let trId = "trId" + element.cod
      let checkboxId = "checkboxCodigo" + element.cod
      var linha = `<tr id = "${trId}">
                      <td>${element.cod}</td>
                      <td>${element.nome}</td>
                      <td>${element.unid}</td>
                      <td>${element.quant}</td>
                      <td><input type="number" id="${inputId}" onchange="atualizaValor(${element.cod}, ${element.quant}, ${posisaoAtual})" value="${element.codBarras}"></td>
                      <td><input type="checkbox" disabled id="${checkboxId}" checked="${element.coletado}"></td>
                  </tr>`
      corpoTabela.innerHTML += linha
      RiscaLinha(posisaoAtual)
    }
    posisaoAtual++
})


function RiscaLinha(posicao){
  if (armazenamentoLista[posicao].coletado === true){
    console.log("trId" + armazenamentoLista[posicao].cod)
    document.getElementById("trId" + armazenamentoLista[posicao].cod).classList.add("risca")
    document.getElementById('inputCodigo' + armazenamentoLista[posicao].cod).setAttribute("disabled","disabled")
    document.getElementById("checkboxCodigo" + armazenamentoLista[posicao].cod).checked = true
  } 
  
}

function atualizaValor(cod, quantidade, posicao) {
  let input,checkbox
  input = document.getElementById('inputCodigo' + cod)
  checkbox = document.getElementById('checkboxCodigo' + cod)
  armazenamentoLista[posicao].codBarras = Number(input.value)

  if(Number(input.value) >= Number(quantidade)) {
    armazenamentoLista[posicao].coletado = true
    RiscaLinha(posicao)
  }
  localStorage.setItem('listaCompras', JSON.stringify(armazenamentoLista))
}

function tudoColetado() {
  let retorno = true
  armazenamentoLista.forEach(elemento => {
    if(elemento.coletado === false) {
      retorno = false
    }
  })
  return retorno
}

function trataDados(dadosCompras, dadosProdutos, posicao) {
  let retorno = {}
  retorno.Nome = dadosCompras[posicao].nome
  retorno.Unidade = dadosCompras[posicao].unid
  retorno.Quantidade = dadosCompras[posicao].quant
  retorno.CodigoBarra = dadosProdutos[posicao].codBarras
  retorno.Ativo = dadosProdutos[posicao].ativo
  retorno.QuantComprada = dadosCompras[posicao].codBarras
  return retorno
}

function salvar(){
  let metodo = 'POST';
  let data = new Date().getTime()
  fetch(LINK+"Compras",{
    method: metodo,
    body: data
  }
  ).then(function(response) {
      if (response.ok){
          return response.json();
      }
  }).catch (function (error) {
      console.log('Deu ERRO:', error);
  });

  for(let x = 0; x < armazenamentoCadastro.length; x++) {
    fetch(LINK + "Compras/" + 1 + "/Produtos",{
      method: metodo,
      body: JSON.stringify(trataDados(armazenamentoLista, armazenamentoCadastro, x)),
      headers: {'Content-Type': 'application/json'}
    }
    ).then(function(response) {
        if (response.ok){
            return response.json();
        }
    }).catch (function (error) {
        console.log('Deu ERRO:', error);
    });
  }
  
}
