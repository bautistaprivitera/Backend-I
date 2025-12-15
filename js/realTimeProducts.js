const socket = io();

const productList = document.getElementById('productList');
const addForm = document.getElementById('addProduct');
const deleteForm = document.getElementById('deleteProduct');

const renderLista = (products) => {
  productList.innerHTML = '';

  products.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = `${prod.id} - ${prod.title} - $${prod.price}`;
    productList.appendChild(li);
  });
};


socket.on('updateProducts', (products) => {
  renderLista(products);
});


addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('newProduct',{
    title: e.target.title.value,
    price: e.target.price.value
  });

  e.target.reset();
});



deleteForm.addEventListener('submit', (e) => {

  e.preventDefault();
  socket.emit('deleteProduct', e.target.id.value);
  e.target.reset();
  
});


