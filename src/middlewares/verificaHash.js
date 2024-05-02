const prisma = require('../services/prisma')

const verificaHash  = async (req, res, next) =>  {
try{
    const {Email} = req.body;

    const econtraHashVoluntario = await prisma.voluntarios.findFirst({
        where:{
            Email: Email,
        }
    })

    const econtraHashOrganizacao = await prisma.organizacoes.findFirst({
        where:{
            Email: Email,
        }
    })

    if(econtraHashVoluntario){
          req.hash =econtraHashVoluntario.Senha ;
    }
    if(econtraHashOrganizacao){
          req.hash = econtraHashOrganizacao.Senha;
    }

    next()
}catch(err){
    return res.status(500).send({error:err})
}

}


module.exports = verificaHash;