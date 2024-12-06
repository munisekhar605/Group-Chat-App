const express= require('express');
const UserTable=require('../model/usersTable');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async(req,res,next)=>{
    const hashedPassword=await bcrypt.hash(req.body.password,2);
    try{
        const postUserTable= await UserTable.create({name:req.body.name,email:req.body.emailId,password:hashedPassword});
        res.status(200).json({ message: 'User signed up successfully!' });
    }catch(err){
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(500).send(err)
    }
}


const login=async(req,res,next)=>{
    const {emailId,password}=req.body;
    const user=await UserTable.findOne({where:{email:emailId}});
    if(user){
        isPasswordMatched=await bcrypt.compare(password,user.dataValues.password);
        if(isPasswordMatched){
            const jwtToken=await jwt.sign({id:user.dataValues.id,email:user.dataValues.email},'munisekhar',{expiresIn:'10m'});
            res.status(200).send(jwtToken);
        }else{
            res.status(203).send('password Wrong')
        }
    }else{
        res.status(400).send('user not found')
    }
}


module.exports={
    signup,
    login
}