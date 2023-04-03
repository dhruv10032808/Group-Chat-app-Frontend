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
        document.getElementById('msg').textContent+=res.data.message;
    })
}

window.addEventListener('DOMContentLoaded',getmessage)

function getmessage(){
    axios.get('http://localhost:3000/message',{headers:{'Authorization':token}}).then(response=>{
        for(let i=0;i<response.data.length;i++){
            viewmessage(response.data[i])
        }
    }).catch(err=>{
        console.log(err);
    })
}

function viewmessage(msg){
    const parentnode=document.getElementById('msg')
    const childhtml=`<h5>${msg.message}</h5>`;
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
}