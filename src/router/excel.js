const express = require("express");
const router = express.Router();
const excel_controller = require("../controllers/excel");
const mid_auth = require("../middleware/auth");

//Principal de Facturas no hace nada 
router.get("/", (req, res) => res.send("Principal de API Excel"));

//POST: endpoint para consultar las facturas relacionadas con un cliente, en un periodo de tiempo. Requiere token para autenticar el logueo.
/* router.post("/conectar", function (req, res) {
    sgf_controller.conectApi(req, res)
.catch (err => console.log("unexpected error: " + err) )
}) */

router.get("/test",function (req, res) {
    console.log("asd");
    excel_controller.test(req, res) 
})

module.exports = router;



