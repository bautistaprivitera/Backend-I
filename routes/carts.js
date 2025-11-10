const { Router } = require('express');
const {
  createCart,
  getCart,
  addProductToCart
} = require('../db');

const router = Router();

/**
 * POST /api/carts/
 * Crea un nuevo carrito: { id (auto), products: [] }
 */
router.post('/', (req, res) => {
  const cart = createCart();
  res.status(201).json(cart);
});

/**
 * GET /api/carts/:cid
 * Lista los productos del carrito
 */
router.get('/:cid', (req, res) => {
  const cart = getCart(req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart.products);
});

/**
 * POST /api/carts/:cid/product/:pid
 * Agrega un producto al carrito; si ya existe, incrementa quantity
 * Formato: { product: <ID del producto>, quantity: <n> } (se agrega de uno en uno)
 */
router.post('/:cid/product/:pid', (req, res) => {
  const result = addProductToCart(req.params.cid, req.params.pid);
  if (result?.error === 'CART_NOT_FOUND') {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  if (result?.error === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(201).json(result);
});

module.exports = router;
