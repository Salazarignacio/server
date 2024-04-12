
const socket = io(); socket.on('products', data=> { let template = ``; template =
data.map(element=> ` <div class="card mb-2" style="width: 18rem;"> <img
src=${element.photo} class="card-img-top" alt=${element.id}> <div
class="card-body"> <h5 class="card-title">${element.title}</h5> <p
class="card-text">$${element.price}</p> <a
href="/products/details/${element.id}" class="btn btn-outline-secondary">Details</a>
<button class="btn btn-outline-secondary" onclick="destroy('${element.id}')"
type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div> `).join('');
document.querySelector('#realProducts').innerHTML = template }); 

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
function run()
    { const id = document.querySelector('#id').value; 
    const title = document.querySelector('#title').value; 
    const photo = document.querySelector('#photo').value; 
    const category = document.querySelector('#category').value; 
    const price = document.querySelector('#price').value;
   const stock = document.querySelector('#stock').value; 
   socket.emit('create', {title: title, photo: photo, category: category, price: price, stock:stock}) } 
function destroy(id)
{ socket.emit('destroy', id) }; 

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


