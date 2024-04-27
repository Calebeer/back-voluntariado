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
    // const {Nome, Cnpj, Telefone, Email, Endereco, Senha} = data;
    //
    // const emailEncontrado = await prisma.organizacoes.findFirst({
    //     where:{
    //         Email
    //     }
    // });
    //
    // console.log(emailEncontrado)
    // console.log(Email)
    const organizacao = await prisma.organizacoes.create({
        data:data
    });
    return organizacao;

}

module.exports = {
    criarVoluntario,
    criarOrganizacao
}