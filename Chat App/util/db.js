const Sequelize=require('sequelize');
const sequelize=new Sequelize('group_chat_app','root','1122',{
    host:'localhost',
    dialect:'mysql'
})
module.exports=sequelize;