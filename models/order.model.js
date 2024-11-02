const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    cart_id: String,
    user_id: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            price: Number,
            discount: Number,
            quantity: Number
        }
    ],
    deletedAt: {
        type: Boolean,
        default: false
    }
    }, {
        timestamps: true
    });
const Category = mongoose.model('Order', orderSchema, "orders");

module.exports = Category;