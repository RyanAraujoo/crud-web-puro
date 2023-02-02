const bd = require('./bd')

async function listar(){
    const conn = await bd.conectar()
    const [clientes] = await conn.query('SELECT * FROM `clientes` ORDER BY `clientes`.`nome` ASC')
//    const [clientes] = await conn.query('select * from clientes limit 10 offset 0;')
    return clientes
}

async function buscar(nome){
    const conn = await bd.conectar()
    const sql = `select * from clientes where nome=?;`
    const [cliente] = await conn.query(sql, [nome])
    return cliente
}

async function recuperar(id){
    const conn = await bd.conectar()
    const sql = 'select * from clientes where id=?;'
    const [cliente] = await conn.query(sql, [id])
    return cliente
}
async function inserir(cliente){
    const conn = await bd.conectar()
    const sql =  'insert into clientes(id,nome, telefone, status) values (?,?,?,?);'
    const valores = [cliente.id,cliente.nome, cliente.telefone, cliente.status]
    await conn.query(sql,valores)
}
  
async function atualizar(id, cliente){
    const conn = await bd.conectar()
    const sql =  'update clientes set nome=?, telefone=?, status=?, id=? where nome=?;'
    const valores = [cliente.nome, cliente.telefone, cliente.status, cliente.id,id]
    await conn.query(sql, valores)
}
  
async function deletar(id){
    const conn = await bd.conectar()
    const sql = 'delete from clientes where id=?;'
    await conn.query(sql,[id])
}
  
module.exports = {listar, buscar, recuperar, inserir, atualizar, deletar}