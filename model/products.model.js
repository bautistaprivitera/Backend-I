import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
})

productSchema.plugin(paginate);

export default mongoose.model('Product', productSchema);