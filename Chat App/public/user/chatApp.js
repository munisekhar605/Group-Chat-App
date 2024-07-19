//scrole bar frined stuff
function scrollUpdate(){
    var scrollContainer = document.getElementById('scrollContainer');
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    function scrollToTop() {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}





async function masageSend(event){
    event.preventDefault()
    console.log(event.target.masage.value);
    const masage={
        masage:event.target.masage.value
    };
    const jwt=localStorage.getItem('jwt')
    try{
        const masageSave=await axios.post('http://localhost:3000/user/masagesave',masage,{ headers:{'Authorization':`${jwt}`}});   
    }catch(err){
        if(err.response.status==401){
            alert('please login')
            window.location.href='./login.html'
        }
       
    }
}

window.onload=()=>{
    displayMasages(localStorageGet())
}

// massages get
setTimeout(async function(){
    const jwt=localStorage.getItem('jwt');
    let lastId=0;
    try{
        const data=localStorageGet()
        if(data!==null){
           lastId=data[data.length-1].id
          
        }
        // console.log(data)
        const masages=await axios.get(`http://localhost:3000/user/masages/${lastId}`,{ headers:{'Authorization':`${jwt}`}});
        if(0<masages.data.length && data==null){
            localStoragePost(masages.data);
            displayMasages(localStorageGet())
        }else if(masages.data.length>0){
            localStorageUpdate(data,masages.data);
            displayMasages(localStorageGet())
        }
        
        console.log(masages)
    }catch(err){
        console.log(err)
    }
},5000)


function localStorageGet(){
    let ndata=localStorage.getItem('massages');
    return JSON.parse(ndata)
}

function localStoragePost(data){
    let ndata=JSON.stringify(data)
    localStorage.setItem('massages',ndata);
}
function localStorageUpdate(oldData,data){
    let mergedData = oldData.concat(data);
    localStorage.setItem('massages',JSON.stringify(mergedData));
}


//display massages
function displayMasages(masasges){
    if(masasges){
     const element=document.getElementById('massage');
     element.innerText=''
     const tElement=document.createElement('div')
     tElement.className='chat-container-dom '
     for(let i=0;i<masasges.length;i++){
         let tE=document.createElement('div');
         tE.innerHTML=`<div class="chat-item ">${masasges[i].masage}</div>`;
         tElement.appendChild(tE)
     }
     element.appendChild(tElement)
     scrollUpdate()
    }
 }