const repository  = require("../repositorys/user.repository");
const prisma = require("../services/prisma")
const jwt = require("jsonwebtoken");
const jwtSecret = 'voluntariado';
const argon2 = require('argon2');
const userRepository = require("../repositorys/user.repository");

const criaVoluntario = async (req, res) => {
    try{
        const user = await repository.criarVoluntario(req.body);
        console.log(user)
        res.status(200).send(user);
    }catch(e){
        console.error(e);
        return res.status(400).send({error: e});
    }
}



const criaOrganizacao = async (req, res) => {
    try{
        const { Cnpj, Telefone, Email} = req.body;

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

const validate_token = async(req, res) => {
    const { token } = req.body;
    return res.status(200).send({
        user: jwt.decode(token)
    });
}

const logar = async(req, res) => {
    try{
        console.log(req.body)
        const { Email, Senha} = req.body;

        const voluntarioEcontrado = await prisma.voluntarios.findFirst({
            where:{
                    Email: Email
            },
        })
        console.log(voluntarioEcontrado)
        const organizacaoEncontrado = await prisma.organizacoes.findFirst({
            where:{
                    Email:Email
            },
        })

        if(!voluntarioEcontrado && !organizacaoEncontrado){
            return res.status(400).send({error:"Email ou senha inválidos"});
        }

        //aqui está sendo verificado a hash e é feito uma validação pra ver se bate com a senha que o usuário digitou
        const verificaHash = await argon2.verify(req.hash,Senha)

        //Aqui ele verifica se o email do voluntario foi encontrado e se a senha bate com a hash, e é gerado o Token
            if(voluntarioEcontrado && verificaHash){
                const token = jwt.sign({
                    id:voluntarioEcontrado.ID,
                    tipo:'voluntario',
                    nome:voluntarioEcontrado.Nome
                },jwtSecret,{expiresIn: '5h'} )
                return res.status(200).send({auth:true,token});
            }

            if(organizacaoEncontrado && verificaHash){
                const token = jwt.sign({
                    id:organizacaoEncontrado.ID,
                    tipo:'organizacao',
                    Nome:organizacaoEncontrado.Nome
                },jwtSecret, {expiresIn: '5h'} )
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

const criarEvento = async(req, res) => {
    try{
        const criaEvento = await repository.criarEvento(req.body);
        return res.status(200).send(criaEvento);
    }catch(e){
        console.log(e)
        return res.status(400).send({error:e});
    }
}

const criarCandidatura = async (req, res) => {
    try{
        const criaCandidatura = await userRepository.criarCandidatura(req.body);
        return res.status(200).send(criaCandidatura);
    }catch(e){
        console.log(e)
        return res.status(400).send({error:e});
    }
}


const atualizaEstadoVoluntarioParaAceito = async (req, res) => {
    try{
        const atualizaEstadoDoVoluntario = await userRepository.atualizaCandidaturaAceito(req.body);
        return res.status(200).send(atualizaEstadoDoVoluntario);
    }catch (e){
        return res.status(400).send({error:e});
    }
}

const atualizaCandidaturaParaRejeitado = async (req, res) => {
    try{
        const atualizaCandidaturaParaRejeitado = await userRepository.atualizaCandidaturaRejeitado(req.body);
        return res.status(200).send(atualizaCandidaturaParaRejeitado);
    }catch (e){
        return res.status(400).send({error:e});
    }
}

module.exports = {
    criaVoluntario,
    criaOrganizacao,
    logar,
    validate_token,
    listaVoluntarios,
    criarEvento,
    criarCandidatura,
    atualizaEstadoVoluntarioParaAceito,
    atualizaCandidaturaParaRejeitado
}