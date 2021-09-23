const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_URI || "localhost",  
});

module.exports =  sequelize;