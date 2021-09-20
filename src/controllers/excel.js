const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.test = async (req, res) => {
var excel = require('exceljs');
var options = {
    filename: './src/files/streamed-workbook.xlsx',
    useStyles: true,
    useSharedStrings: true
};

var workbook = new excel.stream.xlsx.WorkbookWriter(options);
var worksheet = workbook.addWorksheet('My Sheet');
worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'DOB', width: 10 }
];

worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
worksheet.commit();

workbook.commit().then(function(){
    console.log('xls file is written.');
}); 
const directoryPath =  "./src/files/streamed-workbook.xlsx";

res.download(directoryPath, "streamed-workbook.xlsx", (err) => {
  if (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
});
};
