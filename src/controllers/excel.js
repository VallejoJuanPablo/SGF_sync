const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.test = async (req, res) => {
  const sql = "SELECT * from productos_2 where entidadimportarprecio = '2'";
  db.query(sql)
    .then((productos) => {


      var excel = require("exceljs");
      var options = {
        filename: "./src/files/streamed-test.xlsx",
        useStyles: true,
        useSharedStrings: true,
      };

      var workbook = new excel.stream.xlsx.WorkbookWriter(options);
      var worksheet = workbook.addWorksheet("My Sheet");
      worksheet.columns = [
        { header: "Id", key: "id", width: 10 },
        { header: "Name", key: "name", width: 45 },
        { header: "D.O.B.", key: "DOB", width: 10 },
      ];

      productos[0].forEach(element => {
        worksheet.addRow({ id: element['id'], name: element['producto'], dob: new Date(1970, 1, 1) });
      });
      
    
      worksheet.commit();

      workbook.commit().then(function () {
        console.log("xls file is written.");
      });
      const directoryPath = "./src/files/streamed-test.xlsx";

      res.download(directoryPath, "streamed-test.xlsx", (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
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
