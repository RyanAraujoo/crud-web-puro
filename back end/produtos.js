const bd = require('./bd')

async function listar(){
    const conn = await bd.conectar()
    const [produtos] = await conn.query('SELECT * FROM `produtos`')
//    const [clientes] = await conn.query('select * from clientes limit 10 offset 0;')
    return produtos
}

async function buscar(nome){
    const conn = await bd.conectar()
    const sql = `select * from produtos where nome=?;`
    const [produtos] = await conn.query(sql, [nome])
    return produtos
}

async function recuperar(id){
    const conn = await bd.conectar()
    const sql = 'select * from produtos where id=?;'
    const [produtos] = await conn.query(sql, [id])
    return produtos
}
async function inserir(produto){
    const conn = await bd.conectar()
    const sql =  'insert into produtos(id,nome, quantidade, valor) values (?,?,?,?);'
    const valores = [produto.id,produto.nome, produto.quantidade, produto.valor]
    await conn.query(sql,valores)
}
  
async function atualizar(id, produto){
    const conn = await bd.conectar()
    const sql =  'update produtos set nome=?, quantidade=?, valor=?, id=? where nome=?;'
    const valores = [produto.nome, produto.quantidade, produto.valor, produto.id,id]
    await conn.query(sql, valores)
}
  
async function deletar(id){
    const conn = await bd.conectar()
    const sql = 'delete from produtos where id=?;'
    await conn.query(sql,[id])
}
  
module.exports = {listar, buscar, recuperar, inserir, atualizar, deletar}