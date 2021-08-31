const db = require("../config/database");
//Middleware , usado para comprobar la autenticación de usuario.

function isAuth(req, res, next) {
    
const codfarmacia = req.body.codfarmacia;
const codpami = req.body.codpami;
const cuit = req.body.cuit;

    if (!req.headers.authorization) {
        return res.status(403).send({ 
            status:403,
            message: 'No Autorizado'})
    }
    if (req.headers.authorization == process.env.API_KEY) {
        next()
    }else{
        log(codfarmacia,cuit,codpami);
        return res.status(403).send({ 
            status:403,
            message: 'No Autorizado'})
    }
}


function log (codfarmacia,cuit,codpami){
  const sql = "INSERT into log (codfarmacia,cuit,codpami,endpoint,datos) VALUES ('"+codfarmacia+"','"+cuit+"','"+codpami+"','unauthorized','unauthorized')";
  db.query(sql)
    .then((result) => {
      return true
    })
    .catch((err) => {
      return false
    });
}
    
module.exports = isAuth