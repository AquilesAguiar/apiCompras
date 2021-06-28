let armazenamento = JSON.parse(localStorage.getItem('listaCompras'))
armazenamento.forEach(element => {
  var corpoTabela = document.getElementById('produtosLista')
    if(element.ativo === true) {
      let inputId = "inputCodigo" + element.cod
      let checkboxId = "checkboxCodigo" + element.cod
      var linha = `<tr id="linhaTable">
                    <td>${element.cod}</td>
                    <td>${element.nome}</td>
                    <td>${element.unid}</td>
                    <td>${element.quant}</td>
                    <td><input type="number" id="${inputId}" onchange="atualizaValor(${element.cod}, ${element.quant})"></td>
                    <td><input type="checkbox" disabled id="${checkboxId}"></td>
                  </tr>
                  `
      corpoTabela.innerHTML += linha
    }
})

function atualizaValor(cod, quantidade) {
  let input
  let checkbox
  for(let x = 0; x < armazenamento.length; x++) {
    if(armazenamento[x].cod === cod) {
      input = document.getElementById('inputCodigo' + armazenamento[x].cod)
      checkbox = document.getElementById('checkboxCodigo' + armazenamento[x].cod)
    }
  }
  if(Number(input.value) >= Number(quantidade)) {
    checkbox.checked = true
  }
}