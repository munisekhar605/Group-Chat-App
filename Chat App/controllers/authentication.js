const UserTable=require('../model/usersTable');
const bcrypt=require('bcrypt');

const signup=async(req,res,next)=>{
    const hashedPassword=await bcrypt.hash(req.body.password,2);
    try{
        const postUserTable= await UserTable.create({name:req.body.name,email:req.body.emailId,password:hashedPassword});
        res.status(200).json({ message: 'User signed up successfully!' });
    }catch(err){
        res.status(404).send(err)
    }
}

const login=async(req,res,next)=>{
    
}
module.exports={
    signup,
    login
}