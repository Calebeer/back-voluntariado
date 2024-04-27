const express = require('express');
const router = express.Router();
const taskController  = require('../src/controllers/user.controller');
const middlewareOrganizacao = require('../src/middlewares/organizacaoMiddleware')


const teste = (req,res)=>{res.send('Hello World!');}

router.use(express.json());

router.post('/voluntario', taskController.criaVoluntario);
router.post('/organizacao',taskController.criaOrganizacao );

module.exports = router;