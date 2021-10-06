const fs = require("fs");
const db = require("../config/database");


function log (codfarmacia,cuit,codpami,endpoint,datos){
  const sql = "INSERT into log (codfarmacia,cuit,codpami,endpoint,datos) VALUES ('"+codfarmacia+"','"+cuit+"','"+codpami+"','"+endpoint+"','"+datos+"')";
  db.query(sql)
    .then((result) => {
      return true
    })
    .catch((err) => {
      return false
    });
}

//STATUS
module.exports.status = async (req, res) => {
  const resp = true;
  res.jsonp({ status: resp });
};
