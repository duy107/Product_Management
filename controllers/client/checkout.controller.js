const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const helperProduct = require("../../helpers/product");
module.exports.index = async (req, res) => {
    const id = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: id
    });
    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const product = await Product.findOne({
                _id: item.product_id
            }).select("title price discount image slug")
            product.newPrice = helperProduct.newPriceOneProduct(product);
            item.totalPrice = parseInt(product.newPrice * item.quantity);
            item.productInfo = product;
        }
    }
    const total = cart.products.reduce((sum, item) => {
        return sum + item.totalPrice
    }, 0)
    res.render('client/pages/checkout/index.pug', {
        pageTitle: "Thanh toán",
        cart: cart,
        totalPrice: total
    });
}

module.exports.order = async (req, res) => {
    const cart_id = req.cookies.cartId;
    const info = req.body;
    const cart = await Cart.findOne({ _id: cart_id });
    let products = [];
    if (cart.products.length > 0) {
        for (item of cart.products) {
            const objectProduct = {
                product_id: item.product_id,
                price: 0,
                discount: 0,
                quantity: item.quantity
            }
            const product = await Product.findOne({ _id: item.product_id }).select("price discount");
            objectProduct.price = product.price;
            objectProduct.discount = product.discount;
            products.push(objectProduct)
        }
    }
    const objectOrder = {
        cart_id: cart_id,
        userInfo: info,
        products: products
    }
    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne({
        _id: cart_id
    },
        {
            products: []
        }
    )
    res.redirect(`success/${order.id}`);
}

module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({_id: orderId});

    for(item of order.products) {
        const productInfo = await Product.findOne({_id: item.product_id}).select("title image");
        item.productInfo = productInfo;
        item.newPrice = helperProduct.newPriceOneProduct(item);
        item.totalPrice = item.quantity * item.newPrice;
    }
    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0)
    res.render("client/pages/checkout/success.pug", {
        pageTitle: "Thông báo",
        order: order
    })
}