const jwtSecret = 'voluntariado';
const jwt = require("jsonwebtoken");

const verificacaoJwt = (req, res, next) => {

    const token = req.headers['x-access-token'];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) return res.status(401).send({error:'token expirado'});
            req.user = decoded;
            next()
        })

}


module.exports = verificacaoJwt;