const masagesTable=require('../model/masagesTable')
const masageSave=(req,res,next)=>{
    const id=17
    const masageSaveInDb=masagesTable.create({
        masage:req.body.masage,
        usersTableId:id
    })
}

module.exports={
    masageSave
}