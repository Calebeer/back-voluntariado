const express = require('express');
const cors = require('cors');
const router = require("./router")

const app = express();
app.use(router)
app.use(cors());
app.use(express.json());


// app.use(router)
// app.use('/', routes)

// app.get('/',(req,res)=>res.status(200).send('testando'));
// console.log("Servidor rodando em http://localhost:3010");
module.exports = app;
