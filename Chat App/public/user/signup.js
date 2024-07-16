async function userSignUp(event){
    event.preventDefault();
    const userSignUpDetails={
        name:event.target.name.value,
        emailId:event.target.emailId.value,
        password:event.target.password.value
    }
    console.log(userSignUpDetails)
    try{
        const userSignUpDataPost= await axios.post('http://localhost:3000/signup',userSignUpDetails);
        event.target.reset()
    }catch(err){
        console.log('err')
    }

} 