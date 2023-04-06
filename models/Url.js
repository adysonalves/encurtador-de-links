const {DataTypes} = require('sequelize');
const conn = require('../database/conn');

const Url = conn.define('url', {
    urlOriginal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    urlEncurtada:{
        type: DataTypes.STRING,
        allowNull: false
    },
    views:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Url;