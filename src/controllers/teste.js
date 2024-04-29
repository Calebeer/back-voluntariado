const argon2 = require('argon2');

const user = {
    id:2,
    nome:"calebe",
    senha:"8102023002"
}

async function hash(){
    try{
        console.log(user.senha)
        const hash = await argon2.hash(user.senha);
        console.log(hash)
    }catch(e){
        console.error(e);
    }
}

hash()
