const Sequelize = require('sequelize');
//Conexion a base de datos, (nombre de base de datos, usuario, contraseña)
module.exports = new Sequelize('sistema_gestion_farmacia_sync', 'dbadmin', 'dbavenger', {
    host: '190.7.31.10',
    port:53306,
    dialect: 'mariadb',

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
});