const express=require('express');
const app=express();
const cors=require('cors');
const bodyparser=require('body-parser');

const user=require('./routers/user');
const sequelize=require('./util/db')

app.use(cors({
    origin:"http://localhost:5500",
    methods:['GET','POST']
}));
app.use(bodyparser.json())

app.use(user);

sequelize.sync()
.then(re=>{
    app.listen(3000)
}).catch(err=>{
    console.log('error',err)
})