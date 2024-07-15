function userSignUp(event){
    event.preventDefault();
    const userSignUpDetails={
        name:event.target.name.value,
        emailId:event.target.emailId.value,
        password:event.target.password.value
    }
    console.log(userSignUpDetails)
} 