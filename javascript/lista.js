let armazenamento = JSON.parse(localStorage.getItem('listaCompras'))
armazenamento.forEach(element => {
  var corpoTabela = document.getElementById('produtosLista')
    if(element.ativo === true) {
      let inputId = "inputCodigo" + element.cod
      let checkboxId = "checkboxCodigo" + element.cod
      var linha = `<tr id = "linhaCompras">
                      <td>${element.cod}</td>
                      <td>${element.nome}</td>
                      <td>${element.unid}</td>
                      <td>${element.quant}</td>
                      <td><input type="number" id="${inputId}" onchange="atualizaValor(${element.cod}, ${element.quant})" value="${element.codBarras}"></td>
                      <td><input type="checkbox" disabled id="${checkboxId}"></td>
                  </tr>`
      corpoTabela.innerHTML += linha
      console.log(element.cod)
      RiscaLinha(element.cod)
    }
})


function RiscaLinha(cod){
  if (armazenamento[cod - 1].coletado === true){
    document.getElementById('linhaCompras').classList.add("risca")
    document.getElementById('inputCodigo' + cod).setAttribute("disabled","disabled")
    document.getElementById("checkboxCodigo" + cod).checked = true
  } 
  
}

function atualizaValor(cod, quantidade) {
  let input
  let checkbox
  input = document.getElementById('inputCodigo' + cod)
  checkbox = document.getElementById('checkboxCodigo' + cod)
  armazenamento[cod - 1].codBarras = Number(input.value)
  

  if(Number(input.value) >= Number(quantidade)) {
    checkbox.checked = true
    armazenamento[cod - 1].coletado = true
  }
  else {
    checkbox.checked = false
  }
  localStorage.setItem('listaCompras', JSON.stringify(armazenamento))
}