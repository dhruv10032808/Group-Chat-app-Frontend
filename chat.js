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