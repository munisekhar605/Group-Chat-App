const signup=(req,res,next)=>{
   
    const {name,emailId,password}=req.body
    const signupData={
        name:name,
        emailId:emailId,
        password:password
    }
    console.log(signupData)
}

module.exports={
    signup
}