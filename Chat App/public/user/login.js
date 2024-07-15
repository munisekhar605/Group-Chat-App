function userLogin(event){
    event.preventDefault();
    const userLoginDetails={
        emailId:event.target.emailId.value,
        password:event.target.password.value
    }
    console.log(userLoginDetails)
}