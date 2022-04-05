'use strict';
const conect = require('../database/index');
const jwt = require("jsonwebtoken");
require('dotenv').config();


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
    const resultEmail = await conect.query('select * from alunos where email=' + `'${req.body.email}'`);
    if(resultEmail.rows.length>0){
        const id = 1;
        let token = jwt.sign({id}, process.env.SECRET, {expiresIn: 300})
        res.set("x-access-token", token);
        return res.json({auth: true, token: token});
    }else {
        return res.json({mensagem: 'Usuário não encontrado'});
    }
};

function verifyJWT (req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({auth: false, mensagem: 'Sem token de verificação'});
    }

    jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (error) {
            return res.status(500).json({mensagem: 'Token inválido'});
        }
        next();
    });
}


exports.postByCadastro = verifyJWT ,async (req, res, next) => {
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

exports.put = verifyJWT, async (req, res, next) => {
    const n1 = req.params.id
    const { nome, curso, email, senha } = req.body;
    const db = await conect.query(`update alunos set nome='${nome}', curso='${curso}', email='${email}', senha='${senha}' where id =${n1};`);
    return res.json(({
        mensagem: 'Informação atualizada',
        erro: false
    }))
};

exports.delete = verifyJWT, async (req, res, next) => {
    const n1 = req.params.id
    const db = await conect.query(`delete from alunos where id =${n1};`);
    return res.json(({
        mensagem: 'Informação excluída com sucesso',
        erro: false
    }))

};