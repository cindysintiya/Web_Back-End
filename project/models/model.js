const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize("bb_civic", "root", "", {  // db name, username, password
    host    : 'localhost', 
    dialect : 'mysql' 
});

module.exports = {sequelize, DataTypes}