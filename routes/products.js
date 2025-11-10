const { Router } = require('express');
const {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../db');

const router = Router();

/**
 * GET /api/products/
 * Lista todos los productos
 */
router.get('/', (req, res) => {
  const all = listProducts();
  res.json(all);
});

/**
 * GET /api/products/:pid
 * Devuelve un producto por id
 */
router.get('/:pid', (req, res) => {
  const prod = getProduct(req.params.pid);
  if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(prod);
});

/**
 * POST /api/products/
 * Crea un producto (id autogenerado)
 * Campos requeridos: title, description, code, price, status, stock, category, thumbnails
 */
router.post('/', (req, res, next) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    } = req.body;

    // Validaciones mínimas
    if (!title || !description || !code || price == null || status == null || stock == null || !category) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ error: 'price y stock deben ser numéricos' });
    }
    const thumbs = Array.isArray(thumbnails) ? thumbnails : [];

    const created = addProduct({
      title,
      description,
      code,
      price,
      status: Boolean(status),
      stock,
      category,
      thumbnails: thumbs
    });

    res.status(201).json(created);
  } catch (e) { next(e); }
});

/**
 * PUT /api/products/:pid
 * Actualiza por los campos enviados (no se permite modificar id)
 */
router.put('/:pid', (req, res) => {
  if ('id' in req.body) {
    return res.status(400).json({ error: 'No se permite actualizar el id' });
  }
  const updated = updateProduct(req.params.pid, req.body);
  if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updated);
});

/**
 * DELETE /api/products/:pid
 * Elimina un producto
 */
router.delete('/:pid', (req, res) => {
  const ok = deleteProduct(req.params.pid);
  if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
  res.status(204).send();
});

module.exports = router;
