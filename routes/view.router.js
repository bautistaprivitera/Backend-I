const { Router } = require('express');
const productos = require('../productos.js');

const router = Router();

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


//Crear carrito
router.post('/api/cart', (req, res) => {

  const newCart = {
    id: cart.length + 1,
    products: []
  };

  cart.push(newCart);

  res.json({mensaje: 'Carrito creado', carrito: newCart});

});


//Ver productos del carrito
router.post('/api/cart/:cid', (req, res) => {

  const cartId = Number(req.params.cid);
  const cart = cart.find(c => c.id === cartId);

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(carrito);

});


//Agregar productos al carrito
router.post('/api/cart/:cid/product/:pid', (req, res) => {

  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);

  const carrito = carrito.find(c => c.id === cartId);

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
    res.json({mensaje: 'Producto agregado al carrito', carrito});
  }else{
    carrito.products.push({id: productId, quantity: 1});
  }

  res.json({mensaje: 'Producto agregado correctamente al carrito', carrito});

});


//Borrar un producto
router.delete('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id)
  const exist = productos.find(prod => prod.id === id)


if(!exist){

  res.status(404).json({error: 'Producto no encontrado'})

}

productos = productos.filter(prod => prod.id !== id)

res.json({mensaje: 'Producto eliminado', productos})

})


//Modificar un producto
router.put('/api/productos/:id', (req, res) => {
  
  const id = req.params.id
  const data = req.body
  const producto = productos.find(prod => prod.id === id)

if(!producto){

  res.status(404).json({error: 'Producto no encontrado'})

}})

module.exports = router;

