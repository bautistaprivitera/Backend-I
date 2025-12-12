import  { Router } from 'express';
import products from '../products.js';

const router = Router();

let cart = [];
router.get('/products', (req, res) => {

  res.render('products', {
    layout: 'main',
    titulo: 'Listado de productos',
    products,
    hayProductos: products.length > 0

  });
});

router.get('/cart', (req, res) => {

  res.render('carrito', { layout: 'main', cart});

});


//Traer un producto por su id
router.get('/api/products/:id', (req, res) => {

  const id = Number(req.params.id);
  const product = products.find(prod => prod.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  return res.json(product);
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

  const product = products.find(p => p.id === productId);

  if (!product) {
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
router.delete('/api/products/:id', (req, res) => {

  const id = Number(req.params.id)
  const exist = products.find(prod => prod.id === id)


if(!exist){

  return res.status(404).json({error: 'Producto no encontrado'})

}

products = products.filter(prod => prod.id !== id)

return res.json({mensaje: 'Producto eliminado', products})

})


//Modificar un producto
router.put('/api/products/:id', (req, res) => {
  
  const id = Number(req.params.id)
  const data = req.body
  const product = products.findIndex(prod => prod.id === id)

if(product === -1){

  return res.status(404).json({error: 'Producto no encontrado'})

}

products[product] = {...products[product], ...data}

return res.json({mensaje: 'Producto modificado',producto: products[product]})
})

export default router;


