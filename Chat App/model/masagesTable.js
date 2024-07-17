const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const masages=sequelize.define('masages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    masage:{
        type:Sequelize.STRING,
        allowNull:false
    }

})
module.exports=masages;