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


setInterval(async function(){
    try{
        const masages=await axios.get('http://localhost:3000/user/masages');
        displayMasages(masages.data)
       }catch(err){
        console.log(err)
       }
},1000)

function displayMasages(masasges){
    const element=document.getElementById('masages');
    element.innerText=''
    const tElement=document.createElement('div')
    tElement.className='chat-container-dom'
    for(let i=0;i<masasges.length;i++){
        let tE=document.createElement('div')
        tE.innerHTML=`<div class="chat-item">${masasges[i].masage}</div>`;
        tElement.appendChild(tE)
        console.log('i')
    }
    element.appendChild(tElement)

 
}