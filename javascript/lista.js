let armazenamento = JSON.parse(localStorage.getItem('listaCompras'))
armazenamento.forEach(element => {
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
                      <td><input type="number" id="${inputId}" onfocusout="atualizaValor(${element.cod}, ${element.quant})" value="${element.codBarras}"></td>
                      <td><input type="checkbox" disabled id="${checkboxId}" checked="${element.coletado}"></td>
                  </tr>`
      corpoTabela.innerHTML += linha
      RiscaLinha(element.cod)
    }
})


function RiscaLinha(cod){
  if (armazenamento[cod-1].coletado === true){
    console.log("trId" + cod)
    document.getElementById("trId" + cod).classList.add("risca")
    document.getElementById('inputCodigo' + cod).setAttribute("disabled","disabled")
    document.getElementById("checkboxCodigo" + cod).checked = true
  } 
  
}

function atualizaValor(cod, quantidade) {
  let input,checkbox
  input = document.getElementById('inputCodigo' + cod)
  checkbox = document.getElementById('checkboxCodigo' + cod)
  armazenamento[cod - 1].codBarras = Number(input.value)
  

  if(Number(input.value) >= Number(quantidade)) {
    console.log(typeof(cod))
    console.log(cod)
    RiscaLinha(cod)
    armazenamento[cod - 1].coletado = true
  }
  localStorage.setItem('listaCompras', JSON.stringify(armazenamento))
}