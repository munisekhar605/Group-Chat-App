async function userLogin(event){
    event.preventDefault();
    const userLoginDetails={
        emailId:event.target.emailId.value,
        password:event.target.password.value
    }
    try{
        const userLoginDataPost= await axios.post('http://localhost:3000/user/login',userLoginDetails);
        console.log(userLoginDataPost)
         if(userLoginDataPost.status==200){
            alert('Login success');
            localStorage.setItem('jwt',userLoginDataPost.data);
            window.location.href='.\chatRoom.html'
        }else if(userLoginDataPost.status==203){
            alert('Password Wrong');
        }
    }catch(err){
      if(err.response.status==400){
        alert('User Not Found')
      }
    }
}