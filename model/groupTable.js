const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const grop=sequelize.define('groups',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    adminid:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports=grop;