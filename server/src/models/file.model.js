const { Sequelize } = require('sequelize');
const sequelize = require('./database')

const File = sequelize.define('file', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    originalname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    extension: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}, {
});

module.exports = File