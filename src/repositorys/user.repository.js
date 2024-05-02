const prisma = require("../services/prisma")
const argon2 = require("argon2");
const dateTime = require("datatime")
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const moment = require('moment-timezone');
const  { z } = require('zod');

// prisma.eventos.findMany(({})).then((r)=>{
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

const listaTodosVoluntarios = async (req, res) => {
    const busca = await prisma.voluntarios.findMany(({})).then((voluntarios)=>{
            return voluntarios
        })
    return busca
}

const criarEvento = async(data) => {

     const dataHoraBrasil = moment(data.Data).tz('America/Sao_Paulo').format();
     const dataBrasil  = moment(data.Data).tz('America/Sao_Paulo')

    const dataBrasilInicio = dataBrasil.startOf('day').format();
    const dataBrasilFim = dataBrasil.endOf('day').format();

    const validaDataEvento = await prisma.eventos.findFirst({
        where:{
            OrganizacaoID:data.OrganizacaoID,
            Data:dataHoraBrasil
        }
    })

    const quantidadeDeEventosDia = await prisma.eventos.findMany({
        where:{
            OrganizacaoID:data.OrganizacaoID,
                Data:{
                    gte:new Date(dataBrasilInicio),
                    lte:new Date(dataBrasilFim),
                }
        }
    })

    if(quantidadeDeEventosDia.length >= 3){
        return {message:"Uma organização pode criar somente 3 eventos por dia."}
    }

    if(validaDataEvento){
        return {erro:"Evento já cadastrado nessa data"};
    }

     const inserido = await prisma.eventos.create({
         data:{
             ...data,
             Data:new Date(data.Data),
         }
     })
    return inserido || validaDataEvento ||  quantidadeDeEventosDia;
}

module.exports = {
    criarVoluntario,
    criarOrganizacao,
    listaTodosVoluntarios,
    criarEvento,
}