const criarVoluntario  = require("../repositorys/user.repository");

const criar = async (req, res) => {
    try{
        console.log(criarVoluntario)
        const user = await criarVoluntario(req.body);
        res.status(200).send(user);
    }catch(e){
        console.error(e);
        // console.log(req.body)
        return res.status(400).send({error: e});
    }
}

module.exports = criar