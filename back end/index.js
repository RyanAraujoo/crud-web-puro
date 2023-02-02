const express = require('express');
const cors = require('cors');
const p = require('./clientes');
const shortid = require('shortid');
const app = express();
const x = require('./produtos');

app.use(cors());

// para trabalhar com json no framework express
app.use(express.json());

app.get('/produtos', async function(req, res){
    console.log("cheguei no back end fazendo get na lista de produtos")
    const resultado = await x.listar()
    // retorna os dados do array
    res.json(resultado)
})

app.get('/produtos/:nome', async function(req, res){
  console.log("get com nome")
    // recebe o nome via parâmentros da requisição
    let nome = req.params.nome

    // procura a pessoa no array e se encontrar, retorna o objeto completo
    const resultado = await x.buscar(nome)
    res.json(resultado)
})

app.post('/produtos', async function(req, res){
    console.log("fazendo metodo post")
    //recebe dados via corpo da requisição

  // Creating new unique id
  const userId = shortid.generate()
  
    const {nome, quantidade, valor} = req.body

    // fazendo a correspondencia do backend 
    await x.inserir({id: userId, nome: nome, quantidade: quantidade, valor: valor})

    // retorna um objeto com o texto
    res.json('Produto cadastrado com sucesso!')
})

app.put('/produtos/:nome', async function(req, res){
  console.log("cheguei fazendo put")
    // recebe o nome da pessoa via parâmetros da rota
    var idNome = req.params.nome
    const {nome, quantidade,valor,id} = req.body

    const resultado = await x.buscar(nome)

 await x.atualizar(idNome, {nome: nome, quantidade: quantidade, valor: valor, id: id})

    res.json('Dados atualizados com sucesso!') 

    console.log('Produto editado com sucesso')
})

app.delete('/produtos/:id', async function(req, res){
    // recebe o nome via parâmentros da requisição
    var id = req.params.id

    await x.deletar(id)

    res.json('Produto apagado com sucesso')

    console.log('DELETE executado com parâmetro')
})


// cria um array para simular um banco de dados

app.get('/clientes', async function(req, res){
    console.log("cheguei no back end fazendo get na lista de clientes")
    const resultado = await p.listar()
    // retorna os dados do array
    res.json(resultado)
})

app.get('/clientes/:nome', async function(req, res){
  console.log("get com nome")
    // recebe o nome via parâmentros da requisição
    let nome = req.params.nome

    // procura a pessoa no array e se encontrar, retorna o objeto completo
    const resultado = await p.buscar(nome)
    res.json(resultado)
})

app.post('/clientes', async function(req, res){
    console.log("fazendo metodo post")
    //recebe dados via corpo da requisição

  // Creating new unique id
  const userId = shortid.generate()
  
    const {nome, telefone, status} = req.body

    // fazendo a correspondencia do backend 
    await p.inserir({id: userId, nome: nome, telefone: telefone, status: status})

    // retorna um objeto com o texto
    res.json('Cliente cadastrado com sucesso!')
})

app.put('/clientes/:nome', async function(req, res){

    // recebe o nome da pessoa via parâmetros da rota
    var idNome = req.params.nome
    const {nome, telefone, status,id} = req.body

    const resultado = await p.buscar(nome)

 await p.atualizar(idNome, {nome: nome, telefone: telefone, status: status, id: id})

    res.json('Dados atualizados com sucesso!') 

    console.log('Cliente editado com sucesso')
})

app.delete('/clientes/:id', async function(req, res){
    // recebe o nome via parâmentros da requisição
    var id = req.params.id

    await p.deletar(id)

    res.json('Cliente apagado com sucesso')

    console.log('DELETE executado com parâmetro')
})

// coloca o servidor para executar na porta informada
app.listen('3000', function(){
    console.log('Servidor rodando em 3000')
})