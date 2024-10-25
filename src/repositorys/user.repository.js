const prisma = require("../services/prisma")
const argon2 = require("argon2");
const moment = require('moment-timezone');
const Linkfiles = require('../controllers/fileUpload.controller')

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
    const hash = await argon2.hash(data.Senha)
    console.log(hash)
    const organizacao = await prisma.organizacoes.create({
       data:{
           ...data,
           Senha:hash
       }
    });
    return organizacao;

}

const listaTodosVoluntarios = async () => {
    const buscaVoluntarios = await prisma.voluntarios.findMany(({})).then((voluntarios)=>{
            return voluntarios
        })
    return buscaVoluntarios
}

const criarEvento = async(data, imageUploaded) => {

     const eventoInserido = await prisma.eventos.create({
         data:{
             ...data,
             NumVoluntariosNecessarios: parseInt(data.NumVoluntariosNecessarios),
             OrganizacaoID: parseInt(data.OrganizacaoID),
             Data: new Date(data.Data),
             fotoEvento: imageUploaded,
             file:undefined
         }
     })
    return eventoInserido;
}

const criarCandidatura = async(data) => {

    //AQUI VAI SER VERIFICADO SE O USUÁRIO JÁ ESTÁ CADASTRADO NO EVENTO;
    const usuarioJaCadastradoNoEvento  = await prisma.candidaturas.findFirst({
        where:{
            VoluntarioID:data.VoluntarioID,
            EventoID:data.EventoID,
        }
    })

    if(usuarioJaCadastradoNoEvento){
        return {error:"você já está cadastrado nesse evento."}
    }

    const eventoSemVagas = await prisma.candidaturas.count({
        where:{
            EventoID:data.EventoID,
        }
    })

    const quantiadeDePessoasNoEvento  = await prisma.eventos.findUnique({
        where: {
            ID: data.EventoID,
        }
    })
    console.log(quantiadeDePessoasNoEvento)
//AQUI VAI SER VERIFICADO SE O EVENTOS JÁ ESTÁ CHEIO;
    if(eventoSemVagas >= quantiadeDePessoasNoEvento.NumVoluntariosNecessarios){
        return {error:"Esse evento já está cheio"}
    }

    const candidatura = await prisma.candidaturas.create({
        data:{
            ...data
        }
    })
    return candidatura;
}

const atualizaCandidaturaAceito = async(data) => {
    const atualizaCandidatura = await prisma.candidaturas.update({
        where:{
            ID:data.ID
        },
        data:{
            Estado:'Aceito'
        }
    })

    return atualizaCandidatura;
}

const atualizaCandidaturaRejeitado = async(data) => {
    const atualizaCandidatura = await prisma.candidaturas.update({
        where:{
            ID:data.ID
        },
        data:{
            Estado:'Rejeitado'
        }
    })
    return atualizaCandidatura;
}

const edicaoEvento = async(data) => {
    console.log(data)
    const editarEvento = await prisma.eventos.update({
        where:{
            ID:data.ID
        },
        data:{
           ...data,
            Data:new Date(data.Data)
        }
    })
    return editarEvento
}

const eventosPorOrganizacao = async(id) => {
    const eventos = await prisma.eventos.findMany({
        where:{
            OrganizacaoID:id
        }
    })
    return eventos
}

const formDataEvento = async(data)=>{
    const dadosEvento = await prisma.eventos.findUnique({
        where:{
            ID:data
        }
    })
    return dadosEvento;
}



module.exports = {
    criarVoluntario,
    criarOrganizacao,
    listaTodosVoluntarios,
    criarEvento,
    criarCandidatura,
    atualizaCandidaturaAceito,
    atualizaCandidaturaRejeitado,
    edicaoEvento,
    eventosPorOrganizacao,
    formDataEvento
}