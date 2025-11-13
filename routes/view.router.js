const { Router } = require('express');
const productos = require('../productos.js');

const router = Router();

// routes/view.routes.js
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

module.exports = router;

