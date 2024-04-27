const  { z } = require('zod');
const { cpf } = require('cpf-cnpj-validator')
const taskController = require('../controllers/user.controller');

const validacaoOrganizacao = (req, res, next) => {
    try{
        const { body } = req;
        const schema = z.object({
            Nome:z.string().min(1).max(255),
            CNPJ:z.string().min(6).max(255).transform(arg=>{
                return cpf.isValid(arg)
            }),
            Telefone:z.string().min(6).max(255),
            Email:z.string().min(3,{message:"O e-mail deve ter no mínimo 3 caracteres"}).max(255),
            Endereco:z.string().min(6).max(255),
            Senha:z.string().min(8,{message:"A senha deve ter no minimo 8 carcteres"}).max(255),
        })
        schema.parse(body);
        next()
    }
    catch(err){
        const mensagemErro = err.issues.map(issues => issues.message)
        return res.status(500).send({err:mensagemErro})
    }
}

module.exports = {
    validacaoOrganizacao
}