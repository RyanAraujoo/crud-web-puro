
// define a url do servidor
//var url = 'http:/localhost:3000';
var url = 'https://promishop.ryan-araujoara1.repl.co';

var nome_id_edicao_consulta = ''

btn2.setAttribute("disabled","disabled")
btn1.setAttribute("disabled","disabled")
// btn da pagina

var btnPesquisa = document.querySelector("#btnPesquisa");
var btn1Editar = document.querySelector("#btn1");
var btn2Deletar = document.querySelector("#btn2")
var btn3Adicionar = document.querySelector("#btn3");
var btn4Salvar = document.querySelector("#btn4");
var btn5Cancelar = document.querySelector("#btn5");
var inputPesquisaEntradaDeDados = document.querySelector("#btn3");
var pesquisaProduto = document.querySelector("#pesquisaProduto");

// dados para manipulação

var divPesquisa = document.querySelector(".render-pesquisa");
var tbody = document.getElementById("dataTable")

var clientes = []


var groupinputs = {
  nome: document.getElementById("cliente").value,
  telefone: document.getElementById("telefone").value,
  status: document.getElementById("status").value,
  id: document.getElementById("id").value
}

function adicionarClassNoItem(id) {

       btn1Editar.removeAttribute("disabled");
       btn2Deletar.removeAttribute("disabled");
  
       let pegarItemSelect = clientes.find((item) => {return item.id === id})

       if (pegarItemSelect) {
          document.getElementById("id").value = pegarItemSelect.id
          document.getElementById("cliente").value = pegarItemSelect.nome
          document.getElementById("telefone").value = pegarItemSelect.telefone
          document.getElementById("status").value = pegarItemSelect.status  
      
          divPesquisa.style.display = "none"    
          pesquisaProduto.value = ''
          btnPesquisa.removeAttribute("disabled");

       }

       
}

async function _listar() {
  let str = ``  
  let rota = `${url}/clientes`
   await axios.get(rota).then(function (resposta) {
    clientes = resposta.data
     clientes.forEach((item) => {
        str += `
        <tr onclick="adicionarClassNoItem('${item['id']}')">
        <th scope="row" id="row_01">${item.id}</th>
        <td>${item.nome}</td>
        <td>${item.telefone}</td>
        <td>${item.status}</td>
      </tr>
        `
     })
   })
   tbody.innerHTML = str
}
async function _salvar() {
  // testando se os campos foram preenchidos
  if (groupinputs.nome !== ''
    && groupinputs.status !== ''
    && groupinputs.telefone !== '' ) {
      this.ControleVisualBtnsPagina("disabled") // desabilita todos os botões de ação da pagina
    
      // criamos nossa rota especifica
      let rota = `${url}/clientes`
      
      // criamos no objeto com os dados do html
      let dados = {
        nome: groupinputs.nome,
        telefone: groupinputs.telefone,
        status: groupinputs.status
      }
      // fazemos a requisição utilizando o axios passando a rota e o objeto
      await axios.post(rota, dados)
      .then(function(resposta) {
          ControleVisualBtnsPagina("");
          _listar()
          limparInputs('id','cliente','telefone','status')
      }).catch(function(erro) {
          this.ControleVisualBtnsPagina("");
      })
    } else {
      alert("campos não preenchidos!")
    }
}

async function _apagar() {
  let id = document.getElementById("id").value
  // neste momento, pegue a rota com o id especifico referente
    let rota = url + "/clientes/" + id

  // requisita ao metodo delete colocando como parametro a rota 
    await axios.delete(rota)
    .then((function (resposta) {
        _listar()
        limparInputs('id','cliente','telefone','status')
    }))
    .catch(function (error) {
      console.log(error)
    })
    // requisição deve retornar após a finalização do metodo assincrono
    CancelarEnvioDeDadosAoServidor('remover')
    // função acima esconde a tela de confirmação e retorna a aplicação ao normal
}

async function _editar () {
  let id = nome_id

    let rota = url + '/clientes/' + id

    let obj = {
      nome: document.getElementById("cliente").value,
      telefone: document.getElementById("telefone").value,
      status: document.getElementById("status").value,
      id: document.getElementById("id").value
    }

    await axios.put(rota,obj)
    .then((function (resposta) {
      console.log(resposta)
      console.log("uma edição está sendo feita")
      _listar()
      limparInputs('id','cliente','telefone','status')
      CancelarEnvioDeDadosAoServidor('adicionar')
    })) 
    .catch(function (erro) {
      console.log("deu erro na edição")
      console.log(erro)
    })
}

 function trazerDadosParaOsInputs(id) {
   document.getElementById("id").value = id.id
  document.getElementById("cliente").value = id.nome
   document.getElementById("telefone").value =  id.telefone
   document.getElementById("status").value = id.status

   setTimeout(() => { 
    this.ControleVisualBtnsPagina("");
    divPesquisa.style.display = "none"
   }, 3000)
}

async function _buscar() {
  ControleVisualBtnsPagina('disabled')
  let nome = document.getElementById('pesquisaProduto').value

  let rota = `${url}/clientes/${nome}` 

  await axios.get(rota)
  .then(function(resposta){
    let data = resposta.data
    let str = ``  
    data.forEach((item) => {
      str+= `<button type="button" onclick="adicionarClassNoItem('${item['id']}')"> 
      <li id="${item.id}" class="item-pesquisa">   
                ${item.nome}
              </li>
             </button>`
    })
    document.getElementById("res-pesquisa").innerHTML = str
    divPesquisa.style.display = 'block'
  }).catch (function(error){
      console.log(error)
  })

}

function ComecarTelaAdicionar() {
  this.ControleVisualBtnsPagina("disabled");
  btn4Salvar.style.display = "block";
  btn5Cancelar.style.display = "block";
  this.limparInputs("cliente", "telefone", "status");
}

function ComecarEditarDataEscolhida() {
  this.ControleVisualBtnsPagina("disabled");
  btn4Salvar.style.display = "block";
  btn5Cancelar.style.display = "block";
  nome_id = document.getElementById("cliente").value
}

function renderizarPesquisa() {
  ControleVisualBtnsPagina("disabled");
  divPesquisa.style.display = "block";
}

function limparInputs(id1, id2, id3,id4) {
  document.getElementById(id1).value = "";
  document.getElementById(id2).value = "";
  document.getElementById(id3).value = "";
  document.getElementById(id4).value = "";
}

function ChamarTelaRemocao() {
  this.ControleVisualBtnsPagina("disabled");
  document.querySelector(".deletarTelaDados").style.display = "block";
}

function CancelarEnvioDeDadosAoServidor(comando) {
  if (comando == "remover") {
    document.querySelector(".deletarTelaDados").style.display = "none";
  } else if (comando == "adicionar") {
    btn4Salvar.style.display = "none";
    btn5Cancelar.style.display = "none";
  }
  this.ControleVisualBtnsPagina("");
}

function ControleVisualBtnsPagina(string) {
  btn1Editar.setAttribute("disabled", string);
  btn2Deletar.setAttribute("disabled", string);
  btn3Adicionar.setAttribute("disabled", string);
  btnPesquisa.setAttribute("disabled", string);
  pesquisaProduto.setAttribute("disabled", string);
  pesquisaProduto.setAttribute("placeholder", "em operação...");

  if (string !== "disabled") {
    btn1Editar.removeAttribute("disabled");
    btn2Deletar.removeAttribute("disabled");
    btn3Adicionar.removeAttribute("disabled");
    btnPesquisa.removeAttribute("disabled");
    pesquisaProduto.removeAttribute("disabled");
    pesquisaProduto.removeAttribute("placeholder");
  }
}

