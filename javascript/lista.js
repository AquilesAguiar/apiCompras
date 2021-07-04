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

function retornaUltimaPosicao() {
  let retorno = 0;
  fetch(LINK+"Compras"
  ).then(function(response) {
      response.json.forEach(elemento => {
        retorno = response.json.CodCompras
      })
  }).catch (function (error) {
      console.log('Deu ERRO:', error);
  });
  return retorno
}

function salvar(){
  let metodo = 'post';
  let data = Date.now()
  fetch(LINK+"Compras",{
    method: metodo,
    body: data,
    headers: {'Content-Type': 'application/json'}
  }
  ).then(function(response) {
      if (response.ok){
          return response.json();
      }
  }).catch (function (error) {
      console.log('Deu ERRO:', error);
  });

  console.log(LINK +  + retornaUltimaPosicao() + "/Produtos")
  fetch(LINK + retornaUltimaPosicao() + "/Produtos",{
    method: metodo,
    body: JSON.stringify(armazenamentoLista),
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
