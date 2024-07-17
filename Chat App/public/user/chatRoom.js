async function masageSend(event){
    event.preventDefault()
    console.log(event.target.masage.value);
    const masage={
        masage:event.target.masage.value
    };
    const masageSave=await axios.post('http://localhost:3000/user/masagesave',masage);
}
console.log('jj')