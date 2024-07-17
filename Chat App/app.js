const express=require('express');
const app=express();
const cors=require('cors');
const bodyparser=require('body-parser');

const user=require('./routers/user');
const sequelize=require('./util/db');
const usersTable=require('./model/usersTable');
const masagesTable=require('./model/masagesTable');

app.use(cors({
    origin:"http://localhost:5500",
    methods:['GET','POST']
}));
app.use(bodyparser.json())

app.use('/user',user);
masagesTable.belongsTo(usersTable,{constraints:true,onDelete:'CASCADE'});
usersTable.hasMany(masagesTable);

sequelize.sync()
.then(re=>{
    app.listen(3000)
}).catch(err=>{
    console.log('error',err)
})