const socket = io(); 

socket.on('realUsers', data=>{
  let template = ``;
  template = data.map(element=> ` 
  <div class="card mb-2" style="width: 18rem;"> 
    <img src=${element.photo} class="card-img-top" alt=${element.id}> 
    <div class="card-body"> <h5 class="card-title">${element.id}</h5>
     <p class="card-text">${element.email}</p> 
     <a href="/users/details/${element.id}" class="btn btn-outline-secondary">Details</a>
<button class="btn btn-outline-secondary" onclick="destroyUser('${element.id}')" type="button"><i class="fa-regular fa-trash-can"></i></button>
 </div>
</div>`).join('')
document.querySelector('#realUsers').innerHTML = template
})

function destroyUser(id)
{ socket.emit('destroyUser', id) }; 

function runUser()
{
const id = document.querySelector('#idUser').value; 
const photo = document.querySelector('#photoUser').value; 
const email = document.querySelector('#email').value; 
const password= document.querySelector('#password').value; 
const role= document.querySelector('#role').value ;
socket.emit('createUser', {id:id, photo: photo, email: email, password: password, role: role})
}


