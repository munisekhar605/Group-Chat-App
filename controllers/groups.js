const { where } = require('sequelize');
const groupTable=require('../model/groupTable');
const massagesTable=require('../model/masagesTable');
const usersTable=require('../model/usersTable');

const groupscreate=async (req,res,next)=>{
    const id=req.userid
    const groupname=req.body.groupName;
    try{
        const user=await usersTable.findOne({where:{id:id}});
        const group = await groupTable.create({groupname: groupname,adminid: id});
        await user.addGroup(group);
        res.status(200).send('ok')
    }catch(err){
        res.status(404)
    }
}

const allgroups=async (req,res,next)=>{
    const id=req.userid;
try{
    const data= await usersTable.findOne({
        where:{id:id},
        include: groupTable
    })
    console.log(data)
    res.send(data)
}catch(err){
    console.log('errddd',err)
}
}

const ueseraddingroup=async (req,res,next)=>{
    const groupId=req.body.groupId;
    const email=req.body.email;
   try{
    const findUse=await usersTable.findOne({where:{email:email}});
    const group=await groupTable.findOne({where:{id:groupId}});
    await findUse.addGroup(group);
    res.status(200).send('ok')
   }catch(err){
    res.status(400).send('err')
   }
}

module.exports={
    groupscreate,
    allgroups,
    ueseraddingroup
}

