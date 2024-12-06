const express=require('express');
const app=express();
const socketIo = require('socket.io');
const cors=require('cors');
const bodyparser=require('body-parser');

const user=require('./routers/user');
const sequelize=require('./util/db');
const usersTable=require('./model/usersTable');
const masagesTable=require('./model/masagesTable');
const groupsTable=require('./model/groupTable');

const http = require('http');


app.use(cors());
app.use(bodyparser.json())

const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: ["http://localhost:5500", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

io.on('connection',socket=>{
    console.log('soket sekhar',socket.id)
})



app.use('/user',user);

//association sequlize
masagesTable.belongsTo(usersTable,{constraints:true,onDelete:'CASCADE'});
usersTable.hasMany(masagesTable);
groupsTable.belongsToMany(usersTable,{through:"userGroup"});
usersTable.belongsToMany(groupsTable,{through:"userGroup"});
masagesTable.belongsTo(groupsTable);
groupsTable.hasMany(masagesTable);



sequelize.sync().then(re=>{server.listen(3000)}).catch(err=>{console.log('error',err)})