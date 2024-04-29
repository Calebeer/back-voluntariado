const repository  = require("../repositorys/user.repository");
const prisma = require("../services/prisma")
const jwt = require("jsonwebtoken");
const jwtSecret = 'voluntariado';
const argon2 = require('argon2');
const req = require("express/lib/request");

const criaVoluntario = async (req, res) => {
    try{
        const user = await repository.criarVoluntario(req.body);
        res.status(200).send(user);
    }catch(e){
        console.error(e);
        return res.status(400).send({error: e});
    }
}



const criaOrganizacao = async (req, res) => {
    try{
        const {Nome, Cnpj, Telefone, Email, Endereco, Senha} = req.body;

        const organizacaoEncontrado = await prisma.organizacoes.findFirst({
                where:{
                    OR: [
                        {Email: Email},
                        {Telefone: Telefone},
                        {Cnpj: Cnpj},
                    ],
                },
            });

        if(organizacaoEncontrado){
            return res.status(500).send({error: "Usuário já existe."});
        }

        const organizacao = await repository.criarOrganizacao(req.body)
        return res.status(200).send(organizacao);
    }catch(e){
        return res.status(400).send({error:e});
    }

}

const logar = async(req, res) => {
    try{
        const { Email, Senha} = req.body;

        const voluntarioEcontrado = await prisma.voluntarios.findFirst({
            where:{
                    Email: Email,
                    Senha: Senha
            },
        })

        const organizacaoEncontrado = await prisma.organizacoes.findFirst({
            where:{
                    Email:Email,
                    Senha:Senha
            },
        })


            if(voluntarioEcontrado){
                const token = jwt.sign({id:voluntarioEcontrado.ID,tipo:'voluntario'},jwtSecret, {expiresIn: '5h'} )
                return res.status(200).send({auth:true,token});
            }

            if(organizacaoEncontrado){
                const token = jwt.sign({id:organizacaoEncontrado.ID, tipo:'organizacao'},jwtSecret, {expiresIn: '5h'} )
                return res.status(200).send({auth:true,token});
            }


        return res.status(400).send({error:"Email ou senha inválidos"});

    }catch(e){
        return res.status(500).send({error:e});
    }
}

const listaVoluntarios = async (req, res) => {
    const voluntarios = await repository.listaTodosVoluntarios(req)
    console.log('-->',req.user)
    return res.status(200).send(voluntarios);
}



module.exports = {
    criaVoluntario,
    criaOrganizacao,
    logar,
    listaVoluntarios,
}