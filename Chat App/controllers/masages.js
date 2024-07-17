const masagesTable=require('../model/masagesTable')
const masageSave=(req,res,next)=>{
    const id=17
    const masageSaveInDb=masagesTable.create({
        masage:req.body.masage,
        usersTableId:id
    })
}

const allMasages=async (req,res,next)=>{
    console.log('hi')
    const masages=await masagesTable.findAll({attributs:['masages']})
    res.status(200).send(masages)
}
module.exports={
    masageSave,
    allMasages
}