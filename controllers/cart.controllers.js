import Cart from "../model/cart.model.js";

export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid)
        .populate('products.product')
        .lean();

        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json({status: 'success', payload: cart});
    } catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();

        res.json({status: 'success', payload: cart});
    } catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}

export const updateCartProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.products = products;
        await cart.save();

        res.json({status: 'success', payload: cart});

    } catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        const item = cart.products.find(p => p.product.toString() === pid);
        if(!item) return res.status(404).json({ error: 'Product not found' });

        item.quantity = quantity;
        await cart.save();

        res.json({status: 'success', payload: cart});
        
    }catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.products = [];
        await cart.save();

        res.json({status: 'success', payload: cart});

    }catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}