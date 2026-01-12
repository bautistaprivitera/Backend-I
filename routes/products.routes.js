import  { Router } from 'express';
import { createProduct, getProduct, getProductById, updateProduct, deleteProduct } from '../controllers/products.controllers.js';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;

