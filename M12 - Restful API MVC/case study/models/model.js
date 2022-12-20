import {Sequelize, DataTypes} from 'sequelize'

const sequelize = new Sequelize("store_db", "root", "", {  // db name, username, password
    host    : 'localhost', 
    dialect : 'mysql' 
});

export {sequelize, DataTypes}