import Cart from "../model/cart.model.js";

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product').lean();

        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json({status: 'success', payload: cart});
    } catch (error) {
        res.status(500).json({status: 'error', error: error.message });
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const {pid, cid} = req.params;
        const cart = await Cart.findById(cid);

        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        const idx = cart.products.findIndex(p => p.product.toString() === pid);

        if(idx === -1){
            cart.products.push({product: pid, quantity: 1});
        }else{
            cart.products[idx].quantity++;
        }

        await cart.save();
        res.json({status: 'success', payload: cart});
    } catch (error) {
        return res.status(500).json({status: 'error', error: error.message });
    }
}

export const updateCartProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;

        if(!Array.isArray(products)) return res.status(400).json({ error: 'Products must be an array' });

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.products = products.map(p => ({product: p.product, quantity: Number(p.quantity) || 1}));

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

        const q = Number(quantity);
        if(!Number.isFinite(q) || q < 1) return res.status(400).json({ error: 'Quantity must be a positive number' });

        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ error: 'Cart not found' });

        const idx = cart.products.findIndex(p => p.product.toString() === pid);
        if(idx === -1) return res.status(404).json({ error: 'Product not found in cart' });

        cart.products[idx].quantity = q;
        await cart.save();

        res.json({status: 'success', payload: cart});
        
    }catch (error) {
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