const masagesTable=require('../model/masagesTable');
const {Op}=require('sequelize')
const masageSave=(req,res,next)=>{
    const id=req.userid
    const masageSaveInDb=masagesTable.create({
        masage:req.body.masage,
        usersTableId:id
    })
}

const allMasages=async (req,res,next)=>{
    console.log('hi')
    const lastId=req.params.masageid
    console.log(lastId)
    if(lastId==undefined){
        lastId=0
    }
    console.log(lastId)
    const masages=await masagesTable.findAll({where:{id:{[Op.gt]:lastId}}});

    res.status(200).send(masages)
}
module.exports={
    masageSave,
    allMasages
}