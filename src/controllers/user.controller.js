const repository  = require("../repositorys/user.repository");
const prisma = require("../services/prisma")

const criaVoluntario = async (req, res) => {
    try{
        // console.log(criarVoluntario)
        const user = await repository.criarVoluntario(req.body);
        res.status(200).send(user);
    }catch(e){
        console.error(e);
        // console.log(req.body)
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

module.exports = {
    criaVoluntario,
    criaOrganizacao
}