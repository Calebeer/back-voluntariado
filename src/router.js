const express = require('express');
const router = express.Router();
const criar  = require('../src/controllers/user.controller');

const teste = (req,res)=>{res.send('Hello World!');}

router.use(express.json());

router.post('/criar', criar);
router.get('/',teste );

module.exports = router;