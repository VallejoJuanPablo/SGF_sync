const fs = require("fs");
const db = require("../config/database");

//Controlador de usuarios , contiene todas la funciones realcionadas con el usuario.
module.exports.test = async (req, res) => {
  const sql = "SELECT * from productos_2 where entidadimportarprecio = '2'";

  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);

  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  let year = date_ob.getFullYear();

  const nameFile = "productos_2_" + year + "-" + month + "-" + date;
  const directoryPath = "./src/files/"+nameFile+".xlsx";

  db.query(sql)
    .then((productos) => {
      var excel = require("exceljs");
      var options = {
        filename: "./src/files/"+nameFile+".xlsx",
        useStyles: true,
        useSharedStrings: true,
      };

      var workbook = new excel.stream.xlsx.WorkbookWriter(options);
      var worksheet = workbook.addWorksheet("My Sheet");
      worksheet.columns = [
        { header: "Codigo Almacen", key: "codalmacen", width: 10 },
        { header: "Codigo Producto", key: "codproducto", width: 80 },
        { header: "Producto", key: "producto", width: 100 },
        { header: "Principio Activo", key: "principioactivo", width: 25 },
        { header: "Descripcion", key: "descripcion", width: 50 },
        { header: "Codigo Categoria", key: "codcategoria", width: 10 },
        { header: "Codigo Presentacion", key: "codpresentacion", width: 10 },
        { header: "Codigo Medida", key: "codmedida", width: 10 },
        {
          header: "Entidad Importar Precio",
          key: "entidadimportarprecio",
          width: 10,
        },
        {
          header: "Precio Archivo Proveedor",
          key: "precioarchivoproveedor",
          width: 10,
        },
        { header: "Precio Compra", key: "preciocompra", width: 10 },
        { header: "Precio Venta Caja", key: "precioventacaja", width: 10 },
        {
          header: "Precio Venta Unidad Sugerido",
          key: "precioventaunidadsugerido",
          width: 10,
        },
        { header: "Precio Venta Unidad", key: "precioventaunidad", width: 10 },
        { header: "Stock Minimo", key: "stockminimo", width: 10 },
        { header: "Stock Total", key: "stocktotal", width: 10 },
        { header: "Unidades", key: "unidades", width: 10 },
        { header: "Iva Producto", key: "ivaproducto", width: 10 },
        { header: "Descuento Producto", key: "descproducto", width: 10 },
        { header: "Fecha Elaboracion", key: "fechaelaboracion", width: 10 },
        { header: "Fecha Expiracion", key: "fechaexpiracion", width: 10 },
        { header: "Codigo de Barra", key: "codigobarra", width: 10 },
        { header: "Codigo Laboratorio", key: "codlaboratorio", width: 10 },
        { header: "Codigo Proveedor", key: "codproveedor", width: 10 },
        { header: "Lote producto", key: "loteproducto", width: 10 },
        { header: "Ubicacion", key: "ubicacion", width: 10 },
        { header: "Status", key: "status", width: 10 },
        { header: "Trazable", key: "trazable", width: 10 },
        { header: "Fraccionado", key: "fraccionado", width: 10 },
        { header: "Alfabeta", key: "alfabeta", width: 10 },
        { header: "ID Alfabeta", key: "id_alfabeta", width: 10 },
      ];

      productos[0].forEach((element) => {
        worksheet.addRow({
          codalmacen: element["codalmacen"],
          codproducto: element["codproducto"],
          producto: element["producto"],
          principioactivo: element["principioactivo"],
          descripcion: element["descripcion"],
          codcategoria: element["codcategoria"],
          codpresentacion: element["codpresentacion"],
          codmedida: element["codmedida"],
          entidadimportarprecio: element["entidadimportarprecio"],
          precioarchivoproveedor: element["precioarchivoproveedor"],
          preciocompra: element["preciocompra"],
          precioventacaja: element["precioventacaja"],
          precioventaunidadsugerido: element["precioventaunidadsugerido"],
          previoventaunidad: element["previoventaunidad"],
          stockminimo: element["stockminimo"],
          stocktotal: element["stocktotal"],
          unidades: element["unidades"],
          ivaproducto: element["ivaproducto"],
          descproducto: element["descproducto"],
          fechaelaboracion: element["fechaelaboracion"],
          fechaexpiracion: element["fechaexpiracion"],
          codigobarra: element["codigobarra"],
          codlaboratorio: element["codlaboratorio"],
          codproveedor: element["codproveedor"],
          loteproducto: element["loteproducto"],
          ubicacion: element["ubicacion"],
          status: element["status"],
          trazable: element["trazable"],
          fraccionado: element["fraccionado"],
          alfabeta: element["alfabeta"],
          id_alfabeta: element["id_alfabeta"],
        });
      });

      worksheet.commit();

      workbook.commit().then(function () {
        console.log("creado archivo con exito" + directoryPath);
        return res.status(200).send({
          status: 200,
          message: "Operacion Correcta",
          producto : nameFile
        });
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
