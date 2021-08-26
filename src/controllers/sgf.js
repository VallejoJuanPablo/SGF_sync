const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.consultar = async (req, res) => {
  const sql = "SELECT * from productos LIMIT 10";
  db.query(sql)
    .then((productos) => {
      return res.status(200).send({
        status: 200,
        message: "Operacion Correcta",
        response: productos[0],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: "Error conectando BD.",
      });
    });
};

//STATUS
module.exports.status = async (req, res) => {
  const resp = true;
  res.jsonp({ status: resp });
};
