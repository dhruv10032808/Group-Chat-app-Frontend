const token=localStorage.getItem('token')

window.addEventListener('DOMContentLoaded',getgroup)

function getgroup(){
    axios.get('http://localhost:3000/getgroup',{headers:{'Authorization':token}}).then(response=>{
        response.data.group.forEach(group=>{
            const list=document.getElementById('group');
            const childhtml=`<a onclick="showuser(${group.id})" style="cursor:pointer;">${group.groupname}</a>`
            list.innerHTML+=childhtml;
        })
    }).catch(err=>console.log(err))
}

function showuser(gid){
    localStorage.setItem('groupId',gid);
    axios.get(`http://localhost:3000/getgroupuser/${gid}`,{headers:{'Authorization':token}}).then(response=>{
        response.data.user[0].users.forEach(user=>{
            const list=document.getElementById('user');
            let childhtml;
            childhtml=`<a class="nav-link">${user.name}</a>`
            if(response.data.isadmin){
                childhtml=`<li><a>${user.name}</a><button onclick="removefromgroup(${user.id},${response.data.user[0].id})">Remove</button> <button onclick="makeadmin(${user.id},${response.data.user[0].id})">Make Admin</button></a></li?`
            }else{
                childhtml=`<li><a>${user.name}</a></li>`
            }
            list.innerHTML+=childhtml;
        })
    })
}

function removefromgroup(userId,gid){
    axios.get(`http://localhost:3000/removefromgroup/${userId}/${gid}`,{headers:{'Authorization':token}}).then(response=>{
        alert(response.data.message)
    }).catch(err=>console.log(err))
}

function makeadmin(userId,gid){
    axios.get(`http://localhost:3000/makeadmin/${userId}/${gid}`,{headers:{'Authorization':token}}).then(response=>{
        alert(response.data.message)
    }).catch(err=>console.log(err))
}