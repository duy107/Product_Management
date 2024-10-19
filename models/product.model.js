const mongoose = require("mongoose");
const getTime = require("../helpers/getTime");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },

    deletedAt: String,
    status: String,
    quantity: Number,
    position: Number
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;