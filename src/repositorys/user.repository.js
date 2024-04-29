const prisma = require("../services/prisma")
const argon2 = require("argon2");

// prisma.voluntarios.findMany(({})).then((r)=>{
//     console.log(r)
// })

 const criarVoluntario = async (data) => {
     const hash = await argon2.hash(data.Senha)

     const voluntario = await prisma.voluntarios.create({
        data: {
            ...data,
            DataNascimento:new Date(data.DataNascimento),
            Senha:hash
        }
    });
    return voluntario;
}

const criarOrganizacao = async (data) => {
    const organizacao = await prisma.organizacoes.create({
        data:data
    });
    return organizacao;

}

const listaTodosVoluntarios = async (req, res) => {

    const busca = await prisma.voluntarios.findMany(({})).then((voluntarios)=>{
            return voluntarios
        })
    return busca
}


module.exports = {
    criarVoluntario,
    criarOrganizacao,
    listaTodosVoluntarios
}