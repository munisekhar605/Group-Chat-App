async function masageSend(event){
    event.preventDefault()
    console.log(event.target.masage.value);
    const masage={
        masage:event.target.masage.value
    };
    try{
        const masageSave=await axios.post('http://localhost:3000/user/masagesave',masage);
        
    }catch(err){
        alert('geting error')
    }
}

window.onload=async ()=>{
   try{
    const masages=await axios.get('http://localhost:3000/user/masages');
    console.log(masages.data[1].masage)
    for(let i=0;i<masages.data.length;i++){
        displayMasages(masages.data[i].masage)
    }
 
   }catch(err){
    console.log(err)
   }
}

function displayMasages(masasge){
 console.log(masasge)
}