const prisma = require("../services/prisma")

prisma.voluntarios.findMany(({})).then((r)=>{
    console.log(r)
})

 const criarVoluntario = async (data) => {
   const voluntario = await prisma.voluntarios.create({
        data: {
            ...data,
            DataNascimento:new Date(data.DataNascimento)
        }
    });
    return voluntario;
}

module.exports = criarVoluntario;