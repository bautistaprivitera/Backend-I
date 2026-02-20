import { Router } from "express";

import { getCartById, updateCartProducts, deleteProductFromCart, updateProductQuantity, clearCart } from "../controllers/cart.controllers.js";


const router = Router();

router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.post('/:cid', updateCartProducts);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', clearCart);

export default router;