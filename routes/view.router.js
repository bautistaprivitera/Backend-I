const { Router } = require('express');
let productos = require('../productos.js');

const router = Router();

let cart = [];

router.get('/productos', (req, res) => {

  res.render('productos', {
    layout: 'main',
    titulo: 'Listado de productos',
    productos,
    hayProductos: productos.length > 0

  });
});

router.get('/cart', (req, res) => {

  res.render('carrito', { layout: 'main', cart});

});


//Traer un producto por su id
router.get('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id);
  const producto = productos.find(prod => prod.id === id);
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  return res.json(producto);
});

//Crear carrito
router.post('/api/cart', (req, res) => {

  const newCart = {
    id: cart.length + 1,
    products: []
  };

  cart.push(newCart);

  return res.json({mensaje: 'Carrito creado', carrito: newCart});

});


//Ver productos del carrito
router.get('/api/cart/:cid', (req, res) => {

  const cartId = Number(req.params.cid);
  const carrito = cart.find(c => c.id === cartId);

  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  return res.json(carrito);

});


//Agregar productos al carrito
router.post('/api/cart/:cid/product/:pid', (req, res) => {

  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);

  const carrito = cart.find(c => c.id === cartId);

  if (!carrito) {
    return res.status(404).json({ error: 'El carrito no existe' });
  }

  const producto = productos.find(p => p.id === productId);

  if (!producto) {
    return res.status(404).json({ error: 'Este producto no existe' });
  }


//Aumentar mas cantidad de un mismo producto
  const item = carrito.products.find(p => p.id === productId);

  if(item){

    item.quantity++;

  }else{

    carrito.products.push({id: productId, quantity: 1});

  }

  return res.json({mensaje: 'Producto agregado correctamente al carrito', carrito});

});


//Borrar un producto
router.delete('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id)
  const exist = productos.find(prod => prod.id === id)


if(!exist){

  return res.status(404).json({error: 'Producto no encontrado'})

}

productos = productos.filter(prod => prod.id !== id)

return res.json({mensaje: 'Producto eliminado', productos})

})


//Modificar un producto
router.put('/api/productos/:id', (req, res) => {
  
  const id = Number(req.params.id)
  const data = req.body
  const producto = productos.findIndex(prod => prod.id === id)

if(producto === -1){

  return res.status(404).json({error: 'Producto no encontrado'})

}

productos[producto] = {...productos[producto], ...data}

return res.json({mensaje: 'Producto modificado',producto: productos[producto]})
})

module.exports = router;

