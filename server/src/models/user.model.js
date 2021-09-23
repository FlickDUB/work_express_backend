const { Sequelize } = require('sequelize');
const sequelize = require('./database')

const User = sequelize.define('user', {
    pk: {
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = User