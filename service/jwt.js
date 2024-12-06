const jwt=require('jsonwebtoken')
const userathontecation=(req,res,next)=>{
    const jwtToken=req.headers.authorization;
    if(!jwtToken){
        res.status(401)
    }
    jwt.verify(jwtToken,'munisekhar',(err,decoded)=>{
        if(err){
            res.status(401)
        }
        req.userid=decoded.id;
        next()
    })
}
module.exports=userathontecation;