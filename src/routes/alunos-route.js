'use strict';
 
const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno-controller');



router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/cadastro', controller.postByCadastro);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;