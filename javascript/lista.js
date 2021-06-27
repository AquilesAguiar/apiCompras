// linha += `<tr>
//   <td>${cod}</td>
//   <td>${nome}</td>
//   <td>${unid}</td>
//   <td>${quant}</td>
//   <td>${codBarras}</td>
//   <td>${ativo}</td>
//   <td> <button onclick="carregarProdutos(${cod})">Editar</button></td>
//   </tr>`;

let armazenamento = JSON.parse(localStorage.getItem('cadProdutos'))
armazenamento.forEach(element => {
  console.log('rodei')
  var corpoTabela = document.getElementById('produtosLista')
  console.log(corpoTabela)
  var linha = `<tr>
                <td>${element.cod}</td>
                <td>${element.nome}</td>
                <td>${element.unid}</td>
                <td>${element.quant}</td>
                <td>${element.codBarras}</td>
                <td>${element.ativo}</td>
                <td> <button onclick="carregarProdutos(${element.cod})">Editar</button></td>
              </tr>`;
});