const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.consultar = async (req, res) => {
  const codfarmacia = req.body.codfarmacia;
const codpami = req.body.codpami;
const cuit = req.body.cuit;
  const entidad = req.body.entidad;
  log(codfarmacia,cuit,codpami,"consultar",entidad);
  const sql = "SELECT * from productos_"+entidad+" where entidadimportarprecio = '"+ entidad +"'";
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
  const codfarmacia = req.body.codfarmacia;
  const codpami = req.body.codpami;
  const cuit = req.body.cuit;
  log(codfarmacia,cuit,codpami,"consultar_entidades","");
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
const codfarmacia = req.body.codfarmacia;
const codpami = req.body.codpami;
const cuit = req.body.cuit;
log(codfarmacia,cuit,codpami,"consultar_precio_individual",codbarra);
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


module.exports.consultar_precio_individual_entidad = async (req, res) => {
  const codbarra = req.body.codbarra;
  const codfarmacia = req.body.codfarmacia;
  const codpami = req.body.codpami;
  const cuit = req.body.cuit;
  const entidad = req.body.entidad;
  log(codfarmacia,cuit,codpami,"consultar_precio_individual_entidad",codbarra);
    const sql = "SELECT codproducto,fraccionado,precioventaunidadsugerido,entidadimportarprecio from productos_"+entidad+" where codigobarra='"+codbarra+"' and entidadimportarprecio='"+entidad+"'";
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
