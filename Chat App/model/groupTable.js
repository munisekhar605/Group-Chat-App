const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const grops=sequelize.define('groups',{
    groupname:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=grops;