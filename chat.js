const message=document.getElementById('message');
const button=document.getElementById('btn');
const token=localStorage.getItem('token');
button.addEventListener('click',send)

function send(e){
    e.preventDefault();
    const data={
        message:message.value
    }
    console.log(data)
    axios.post('http://localhost:3000/message',data,{headers:{'Authorization':token}}).then(res=>{
        console.log(res.data)
        viewmessage(res.data)
    })
}

window.addEventListener('DOMContentLoaded',fetchMessageFromLocal)

setInterval(()=>{
    getmessage()
},10000);

function getmessage(){
    let message=[];
    if(localStorage.hasOwnProperty('message')==='true'){
        message=JSON.parse(localStorage.getItem('message'))
        var lastmsgid=message[message.length-1].id
    }
    //document.getElementById('msg').innerHTML='';
    axios.get(`http://localhost:3000/message/:${lastmsgid}`,{headers:{'Authorization':token}}).then(response=>{
        // for(let i=0;i<response.data.length;i++){
        //     viewmessage(response.data[i])
        // }
        console.log(response.data)
        var arr=[...message,...response.data.message];
        var msg=JSON.stringify(arr);
        //console.log(msg);
        localStorage.setItem('message',msg);
        fetchMessageFromLocal()
    }).catch(err=>{
        console.log(err);
    })
}

function fetchMessageFromLocal(){
    document.getElementById('msg').innerHTML="";
    const msg=JSON.parse(localStorage.getItem('message'));
    console.log(msg);
        for(var i=0;i<msg.length;i++){
            viewmessage(msg[i]);
        }
}

function viewmessage(msg){
    console.log(msg)
    document.getElementById('msg').innerHTML+=`<h5>${msg.message}</h5>`
}