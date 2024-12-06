async function userSignUp(event){
    event.preventDefault();
    const userSignUpDetails={
        name:event.target.name.value,
        emailId:event.target.emailId.value,
        password:event.target.password.value
    }
    console.log(userSignUpDetails)
    try{
        const userSignUpDataPost= await axios.post('http://localhost:3000/user/signup',userSignUpDetails);
        event.target.reset();
        alert('SignUp Success');
        window.location.href='./login.html'
        console.log(userSignUpDataPost)
    }catch(err){
        if(err.response.status==400){
            alert('User already signed up. go login');
            window.location.href='./login.html'
        }
        console.log(err.response.status)
    }

} 