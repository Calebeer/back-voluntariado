const jwtSecret = 'voluntariado';
const jwt = require("jsonwebtoken");

const verificacaoJwt = (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            req.user = decoded;
            next()
        })
    }catch(err){
        return res.status(401).send({error:'token expirado'});
    }

}


module.exports = verificacaoJwt;