import { Router } from "express";
import Product from "../model/products.model.js";
import Cart from "../model/cart.model.js";  

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
        const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
        const sort = req.query.sort;
        const query = req.query.query;
        const cartId = req.session.cartId || "";

        let filter = {};
        if (query !== undefined && query !== null && query !== '') {
            if (query === 'true' || query === 'false'){
                filter = { status : query === "true" };
            }else filter = { category : query };
        }

        let sortOptions = undefined;
        if (sort === "asc") sortOptions = { price: 1 };
        if (sort === "desc") sortOptions = { price: -1 };

        const result = await Product.paginate(filter, { page, limit, sort: sortOptions, lean: true });

        res.render('index', {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            limit,
            sort: sort || "",
            query: query || "",
            cartId
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/products/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product').lean();
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.render('cart', { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;