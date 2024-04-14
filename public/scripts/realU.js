const socket = io(); 

socket.on('realUsers', data=>{
  let template = ``;
  template = data.map(element=> ` 

  <div class="card mb-3" style="max-width: 740px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${element.photo}" class="img-fluid rounded-start" alt="${element.id}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.email}</h5>
        <p class="card-text">Role: ${element.role}</p>
        <p class="card-text">ID: ${element.id}</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
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


