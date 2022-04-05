'use strict';
const conect = require('../database/index');


exports.get =async (req, res, next) => {
    const resultado = await conect.query('select * from alunos');
    return res.json(resultado.rows)
};

exports.getById = async (req, res,next) => {
    const num = req.params.id
    const resultado = await conect.query('select * from alunos where id=' + num );
    return res.json(resultado.rows)
};

exports.postByLogin =async (req, res, next) => {

    const query  = ('select * from alunos where email= ?');
    conect.query(query, {req,body,email});

    if (error) {return res.status(500).send({ error: error})}


}



exports.postByCadastro =async (req, res, next) => {
    const { nome, curso, email, senha } = req.body;
    const emailresult = await conect.query('select * from alunos where email=' + `'${req.body.email}'`);
    if(!emailresult.rows.length>0){
        const resultado = await conect.query(`insert into alunos(nome,curso,email,senha) values('${nome}', '${curso}','${email}', '${senha}')`);
        return res.json(({
            mensagem: 'Informação gravada com sucesso',
            erro: false}))
    }else {
        return res.json({mensagem: 'Este email ja está cadastrado'});
    }
  
};

exports.put =async (req, res, next) => {
    const n1 = req.params.id
    const { nome, curso, email, senha } = req.body;
    const db = await conect.query(`update alunos set nome='${nome}', curso='${curso}', email='${email}', senha='${senha}' where id =${n1};`);
    return res.json(({
        mensagem: 'Informação atualizada',
        erro: false
    }))
};

exports.delete =async (req, res, next) => {
    const n1 = req.params.id
    const db = await conect.query(`delete from alunos where id =${n1};`);
    return res.json(({
        mensagem: 'Informação excluída com sucesso',
        erro: false
    }))

};