const express = require("express");
const router = express.Router();
const sgf_controller = require("../controllers/sgf");
const mid_auth = require("../middleware/auth");

//Principal de Facturas no hace nada 
router.get("/", (req, res) => res.send("Principal de API SYNC"));

//POST: endpoint para consultar las facturas relacionadas con un cliente, en un periodo de tiempo. Requiere token para autenticar el logueo.
/* router.post("/conectar", function (req, res) {
    sgf_controller.conectApi(req, res)
.catch (err => console.log("unexpected error: " + err) )
}) */

router.get("/status",function (req, res) {
    sgf_controller.status(req, res)
})
     
router.post("/consultar", function (req, res) {
    sgf_controller.consultar(req, res)
})

router.post("/consultar_entidades", function (req, res) {
    sgf_controller.consultar_entidades(req, res)
})

router.post("/consultar_precio_individual", function (req, res) {
    sgf_controller.consultar_precio_individual(req, res)
})

module.exports = router;



