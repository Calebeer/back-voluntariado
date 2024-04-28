const jwtSecret = 'voluntariado';
const jwt = require("jsonwebtoken");

const verificacaoJwt = (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            console.log(req.body)
            console.log(decoded)
            console.log(token)

            req.id = decoded.id;
            req.user = decoded;
            next()
        })
    }catch(err){
        return res.status(401).send({error:'token expirado'});
    }

}


module.exports = verificacaoJwt;