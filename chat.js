const message=document.getElementById('message');
const button=document.getElementById('btn');
const token=localStorage.getItem('token');
const form1=document.getElementById('form1');
const form2=document.getElementById('form2');

button.addEventListener('click',send)

function send(e){
    const gid=localStorage.getItem('gid')
    e.preventDefault();
    const data={
        message:message.value
    }
    console.log(data)
    axios.post(`http://localhost:3000/message?gid=${gid}`,data,{headers:{'Authorization':token}}).then(res=>{
        console.log(res.data)
        document.getElementById('chat').innerHTML+=`<p>You:${res.data.message}</p>`
        message.value=''
    })
}

window.addEventListener('DOMContentLoaded',fetchMessageFromLocal)

window.addEventListener('DOMContentLoaded',getgroup)

setInterval(()=>{
    getmessage()
},1000);

function getmessage(){
    let message=[];
    if(localStorage.hasOwnProperty('message')==='true'){
        message=JSON.parse(localStorage.getItem('message'))
        var lastmsgid=message[message.length-1].id
    }
    axios.get(`http://localhost:3000/message/${lastmsgid}`,{headers:{'Authorization':token}}).then(response=>{
        var arr=[...message,...response.data.message];
        var msg=JSON.stringify(arr);
        localStorage.setItem('message',msg);
        fetchMessageFromLocal()
    }).catch(err=>{
        console.log(err);
    })
}

function fetchMessageFromLocal(){
    document.getElementById('chat').innerHTML="";
    const msg=JSON.parse(localStorage.getItem('message'));
    if(msg){
        for(var i=0;i<msg.length;i++){
            viewmessage(msg[i]);
        }
    }
}

function viewmessage(msg){
    const name=localStorage.getItem('name')
    if(msg.user.name==name){
        document.getElementById('chat').innerHTML+=`<p>You:${msg.message}</p>`
    }else{
    document.getElementById('chat').innerHTML+=`<p>${msg.user.name}:${msg.message}</p>`
}
}

form1.addEventListener('submit',creategroup)

function creategroup(e){
    e.preventDefault();
    console.log(e.target.group.value)
    const data={
        group:e.target.group.value
    }
    axios.post('http://localhost:3000/creategroup',data,{headers:{'Authorization':token}}).then(res=>{
        console.log(res)
    }).catch(err=>console.log(err));
}

function getgroup(){
    axios.get('http://localhost:3000/getgroup',{headers:{'Authorization':token}}).then(response=>{
        response.data.group.forEach(group=>{
            const list=document.getElementById('grouplist');
            const childhtml=`<a onclick="getgroupmessage(${group.id},'${group.groupname}')" style="cursor:pointer;">${group.groupname}</a>`
            list.innerHTML+=childhtml;
        })
    })
}

function getgroupmessage(gid,gname){
    document.getElementById('chat').innerHTML='';
    document.querySelector('.msg').innerHTML=`<h5>${gname}</h5>`;
    localStorage.setItem('gid',gid);
    axios.get(`http://localhost:3000/getgroupmessage/?gid=${gid}`,{headers:{"Authorization":token}}).then(res=>{
        res.data.message.forEach(message=>{
            viewmessage(message)
        })
    })
}

form2.addEventListener('submit',joingroup);

function joingroup(e){
    e.preventDefault();
    const gid=localStorage.getItem('gid')
    console.log(e.target.useremail.value);
    const data={
        email:e.target.useremail.value,
        gid:gid
    }
    axios.post('http://localhost:3000/joingroup',data,{headers:{"Authorization":token}}).then(response=>{
        alert(response.data.message)
    }).catch(err=>console.log(err));
}

document.getElementById('details').addEventListener('click',()=>{
    window.location.href='./grouplist.html'
})