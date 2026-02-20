import Product from "../model/products.model.js";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const sort = req.query.sort;
        const query = req.query.query;

        let filter = {};
        if (query !== undefined && query !== null && query !== '') {
            if (query === 'true' || query === 'false'){
                filter = { status : query === "true" };
            }
        }else{
            filter = { category : query };
        }

        const sortOptions = undefined;
        if (sort === "asc") sortOptions = { price: 1 };
        if (sort === "desc") sortOptions = { price: -1 };

        const options = {
            page,
            limit,
            sort: sortOptions,
            lean: true
        }

        const result = await productService.getProduct(filter, options);

        const baseUrl =  `${req.protocol}://${req.get('host')}${req.baseUrl}`; 

        const buildLink = (targetPage) => {
            const params = new URLSearchParams();
            params.set('page', targetPage);
            params.set('limit', limit);
            if (sort) params.set('sort', sort);
            if (query) params.set('query', query);
            return `${baseUrl}?${params.toString()}`
        }

        return res.status({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json(product);
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json({ message: 'Delete success' });
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}