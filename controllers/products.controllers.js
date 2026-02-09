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
        if (query === "true" || query === "false") {
            filter = { status : query === "true" };
        }else{
            filter = { category : query };
        }

        const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const result = await Product.paginate(filter, {
            page,
            limit,
            sort: Object.keys(sortOptions).lenght ? sortOptions : undefined,
            lean: true
        })

        const baseUrl =  `${req.protocol}://${req.get('host')}${req.baseUrl}`; 

        const buildLink = (targetPage) => {
            `${baseUrl}?limit=${limit}&page=${targetPage}` +
            (sort ? `&sort=${sort}` : '') +
            (query ? `&query=${query}` : '');
        }

        res.json({
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