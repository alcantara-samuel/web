'use strict'

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const alunosRoute = require('./routes/alunos-route')


app.use('/', indexRoute);
app.use('/alunos', alunosRoute);


module.exports = app;