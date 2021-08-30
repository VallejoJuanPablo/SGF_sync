const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.consultar = async (req, res) => {
  const entidad = req.body.entidad;
  const sql = "SELECT * from productos where entidadimportarprecio = '"+ entidad +"' LIMIT 10";
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

module.exports.consultar_entidades = async (req, res) => {

  const sql = "SELECT id as codigo,entidad,descr from entidades";
  db.query(sql)
    .then((entidades) => {
      return res.status(200).send({
        status: 200,
        message: "Operacion Correcta",
        response: entidades[0],
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

module.exports.consultar_precio_individual = async (req, res) => {
const codbarra = req.body.codbarra;
  const sql = "SELECT codproducto,fraccionado,precioventaunidad from productos where codigobarra='"+codbarra+"'";
  db.query(sql)
    .then((entidades) => {
      return res.status(200).send({
        status: 200,
        message: "Operacion Correcta",
        response: entidades[0],
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
