const prisma = require("../services/prisma")

// prisma.voluntarios.findMany(({})).then((r)=>{
//     console.log(r)
// })

 const criarVoluntario = async (data) => {
   const voluntario = await prisma.voluntarios.create({
        data: {
            ...data,
            DataNascimento:new Date(data.DataNascimento)
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