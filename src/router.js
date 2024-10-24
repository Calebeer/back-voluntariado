const express = require('express');
const router = express.Router();
const taskController  = require('../src/controllers/user.controller');
const middlewareOrganizacao = require('../src/middlewares/organizacaoMiddleware')
const verificacaoJwt = require('../src/middlewares/verificacaoJwt')
const verificaHash = require('../src/middlewares/verificaHash')
// const teste = (req,res)=>{res.send('Hello World!');}
const fileUpload = require('./controllers/fileUpload.controller')
router.use(express.json());

router.post('/voluntario', taskController.criaVoluntario);
router.post('/organizacao',taskController.criaOrganizacao );
router.get('/voluntario',verificacaoJwt, taskController.listaVoluntarios);
router.post('/login',verificaHash,taskController.logar);
router.post('/validate_token',taskController.validate_token);
router.post('/candidatura',taskController.criarCandidatura);
router.put('/atualizarCandidaturaAceito',taskController.atualizaEstadoVoluntarioParaAceito);
router.put('/atualizarCandidaturaRejeitado',taskController.atualizaCandidaturaParaRejeitado);
router.put('/editarEvento',taskController.edicaoEvento);
router.get('/eventosPorOrganizacao/',verificacaoJwt,taskController.eventosPorOrganizacao);
router.get("/link-files/:fileId", fileUpload.linkFiles);
router.get("/formDataEvento/:id", taskController.formDataEvento);

router.post("/files", fileUpload.upload.single("file"), fileUpload.files);
router.post('/criarEvento', fileUpload.upload.single("file"), taskController.criarEvento);

module.exports = router;