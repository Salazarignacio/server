const socket = io(); 
socket.on('products', (data, cat)=> 
{ let template = ``; 
template = data.map(element=> `<div class="card m-1 " style="width: 25rem;"> 
<img src=${element.photo} class="card-img-top" alt=${element.id}> 
<div class="card-body"> <h5 class="card-title">${element.title}</h5> 
<p class="card-text">$${element.price}</p> 
<a href="/products/details/${element.id}" class="btn btn-outline-secondary">Details</a>
<button class="btn btn-outline-secondary" onclick="destroy('${element.id}')"
type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`).join('');
document.querySelector('#realProducts').innerHTML = template }); 


function run()
    {
    const title = document.querySelector('#title').value; 
    const photo = document.querySelector('#photo').value; 
    const category = document.querySelector('#category').value; 
    const price = document.querySelector('#price').value;
   const stock = document.querySelector('#stock').value; 
   socket.emit('create', {title: title, photo: photo, category: category, price: price, stock:stock}) } 
function destroy(id)
{ socket.emit('destroy', id) }; 