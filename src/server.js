const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const sgf_controller = require("../src/controllers/sgf");
require("dotenv").config();



//body parse(para leer atributos en el body)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//cors 
app.use(cors());

//Ruta de iniciog
app.get('/', (req, res) => res.send("Esta es mi raiz de api"));

//rutas sgf (trae las rutas de otro archivo para que no se junten todas)
app.use('/sgf', require('./router/sgf'));

//rutas excel (trae las rutas de otro archivo para que no se junten todas)
app.use('/excel', require('./router/excel'));


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});

