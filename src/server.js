const dotenv = require('dotenv').config()
const app = require('./app');


app.listen(process.env.PORT,()=>console.log(`rodando na porta ${process.env.PORT}`))
