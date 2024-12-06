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
let groupIDglobal;



window.onload=()=>{
    getuserGroups();
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
            displayMasages(localStorageGet(),groupIDglobal)
        }else if(masages.data.length>0){
            localStorageUpdate(data,masages.data);
            displayMasages(localStorageGet(),groupIDglobal)
        }
        console.log(masages)
    }catch(err){
        console.log(err)
    }
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
    console.log('Connected to server');
});
},1000)


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
function displayMasages(masasges,id){
    if(masasges){
    const filteredMessages = masasges.filter(message => message.groupId === id);
     const element=document.getElementById('massage');
     element.innerText=''
     const tElement=document.createElement('div')
     tElement.className='chat-container-dom '
     for(let i=0;i<filteredMessages.length;i++){
         let tE=document.createElement('div');
         tE.innerHTML=`<div class="chat-item ">${filteredMessages[i].masage}</div>`;
         tElement.appendChild(tE)
     }
     element.appendChild(tElement)
     scrollUpdate()
    }
 }

function addGroup(){
let element=document.getElementById('groupcreate');
element.innerHTML='<form onsubmit="addGroupcall(event)"><input type="text" name="groupName" class="group-create-input-item" placeholder="Enter GroupName"><button class="group-create-button" type=submit>Crete</button></form>'
}
async function addGroupcall(event){
    event.preventDefault();
    const jwt=localStorage.getItem('jwt');
    const data={groupName:event.target.groupName.value}
    try{
        const groupcreate = await axios.post('http://localhost:3000/user/groupscreate',data,{headers:{'Authorization':`${jwt}`}});

    }catch(err){
        if(err.response.status==401){
        alert('please login')
        window.location.href='./login.html'
        }}
}
async function getuserGroups(){
    const jwt=localStorage.getItem('jwt');
    try{
        const groups=await axios.get('http://localhost:3000/user/allgroups',{headers:{'Authorization':`${jwt}`}});
        displayGroups(groups.data.groups)
        console.log(groups.data.groups)
    }catch(err){
        if(err.response.status==401){
        alert('please login')
        window.location.href='./login.html'
        }
    }
}
// displayGroups(4)

// function displayGroups(data){
//     let element=document.getElementById('griups-items-contaner');
//     let tElement=document.createElement('div')
//     for(let i=0;i<data.length;i++){
//         let e=document.createElement('div');
//         e.innerHTML=`<div onclick="groupChatOpen(${data[i].id})" class="group-item flex"> <img src="https://res.cloudinary.com/muni/image/upload/v1721462023/group%20chart%20application/download_3_tsjuyp.png" class="group-icon"></img> <div class="group-name-item" id="${data[i].id}">${data[i].groupname}</div></div>`;
//         console.log(e)
//         element.appendChild(e);
//     }
// }
function displayGroups(data) {
    let element = document.getElementById('groups-items-container'); 
    console.log(data,'hh')
    for (let i = 0; i < data.length; i++) {
        let e = document.createElement('div');
        e.classList.add('group-item', 'flex');
        e.setAttribute('onclick', `groupChatOpen(${data[i].id})`);

        let img = document.createElement('img');
        img.src = "https://res.cloudinary.com/muni/image/upload/v1721462023/group%20chart%20application/download_3_tsjuyp.png";
        img.classList.add('group-icon');

        let name = document.createElement('div');
        name.classList.add('group-name-item');
        name.id = data[i].id;
        name.textContent = data[i].groupname;

        e.appendChild(img);
        e.appendChild(name);
        element.appendChild(e);
    }
    console.log(element)
}


function groupChatOpen(data){
    groupIDglobal=data
     displayGroupMassages(data)
     displayMasages(localStorageGet(),data);
}

function displayGroupMassages(data){
    let element=document.getElementById('right-container');
    let groupNmae=document.getElementById(data).textContent
    element.innerHTML=`
    <div>
    <div class="user-chat-container">
                    <div class="right-user-container flex">
                        <img class="right-user-logo group-icon" src="https://res.cloudinary.com/muni/image/upload/v1721462023/group%20chart%20application/download_3_tsjuyp.png"></img>
                        <div class="right-user-name">${groupNmae}</div>
                        <button class="user-add-item" onclick="addUserInGropu()">Add User</button>
                    </div>
                    <div id="input-item-uesr-add-ingroup"></div>
                <div class="massages messageContainer" id="scrollContainer">
                 <div class="masage-item" id="massage"></div>
                </div>

                <div class="massage-input-container">
                    <form class="massage-input-form-container" onsubmit="masageSend(event)">
                        <input class="massage-input-item" name="masage" id="${data}" placeholder="Send a masage...." type="text">
                        <button class="masageSend-button-item">Send</button>
                    </form>
                </div>
    </div>
    `
}

async function masageSend(event){
    event.preventDefault()
    console.log(event.target.masage.value);
    let tgroup=event.target.querySelector('.massage-input-item');
    const masage={
        masage:event.target.masage.value,
        groupid:tgroup.id
    };
    event.target.masage.value='';
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

function addUserInGropu(){
    console.log("jnjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    const element=document.getElementById('input-item-uesr-add-ingroup');
    element.innerHTML=`<form onsubmit="addUserInGropuInpu(event)"><input type='text' name="email"><button type='submit'>Add</button></form>`
}
async function addUserInGropuInpu(event){
    event.preventDefault();
    const jwt=localStorage.getItem('jwt')
    const data={
        email:event.target.email.value,
        groupId:groupIDglobal
    }
    try{
        const adduser=await axios.post('http://localhost:3000/user/ueseraddingroup',data,{headers:{'Authorization':`${jwt}`}});
        alert(event.target.email.value,"succuss fully added");
        
    }catch(err){
        console.log(err)
    }
}