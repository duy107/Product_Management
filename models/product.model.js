const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discount: Number,
    description: String,
    image: String,
    featured: String,
    category_id: {
        type: String,
        default: ""
    },
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    status: String,
    quantity: Number,
    position: Number,
    createdBy: {
        account_id: String,
        fullName: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    deletedBy: {
        account_id: String,
        deletedAt: Date
    }
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;