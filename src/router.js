const express = require('express');
const router = express.Router();
const taskController  = require('../src/controllers/user.controller');
const middlewareOrganizacao = require('../src/middlewares/organizacaoMiddleware')
const verificacaoJwt = require('../src/middlewares/verificacaoJwt')


const teste = (req,res)=>{res.send('Hello World!');}

router.use(express.json());

router.post('/voluntario', taskController.criaVoluntario);
router.post('/organizacao',taskController.criaOrganizacao );
router.get('/voluntario',verificacaoJwt, taskController.listaVoluntarios);
router.post('/login',taskController.logar);

module.exports = router;