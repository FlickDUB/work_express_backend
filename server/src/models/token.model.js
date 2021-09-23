const { Sequelize } = require('sequelize');
const sequelize = require('./database')
const User = require('./user.model')

const Token = sequelize.define('token', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    refreshToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Token