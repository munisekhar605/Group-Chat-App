const express=require('express');
const app=express();
const user=require('./routers/user');
const cors=require('cors');
const bodyparser=require('body-parser');
app.use(cors());
app.use(bodyparser.json())

app.use(user);
app.listen(3000)