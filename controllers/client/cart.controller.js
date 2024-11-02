const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
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
    res.render('client/pages/cart/index.pug', {
        pageTitle: "Giỏ hàng",
        cart: cart,
        totalPrice: total
    });
}
module.exports.addPost = async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    const productId = req.params.productId;
    const id = req.cookies.cartId;
    const cartItem = await Cart.findOne({ _id: id });
    const existProductInCart = cartItem.products.find(item => item.product_id === productId);
    if (existProductInCart) {
        const updateQuantity = existProductInCart.quantity + quantity;
        await Cart.updateOne({
            _id: id,
            "products.product_id": productId
        },
            {
                '$set': {
                    'products.$.quantity': updateQuantity
                }
            })
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };
        await Cart.updateOne({
            _id: id
        },
            {
                $push: { products: objectCart }
            }
        )
    }
    req.flash("success", "Thêm thành công");
    res.redirect("back");
}

module.exports.delete = async (req, res) => {
    const id = req.cookies.cartId;
    const productId = req.params.productId;
    await Cart.updateOne({ _id: id }, { $pull: { products: { product_id: productId } } });
    // const cart = await Cart.findOne({_id: id});
    // const index = cart.products.findIndex(item => item.product_id === productId);
    // cart.products.splice(index, 1);
    // await cart.save();
    res.redirect("back");
}

module.exports.update = async (req, res) => {
    const id = req.cookies.cartId;
    const { productId, quantity } = req.params;
    await Cart.updateOne({
        _id: id,
        "products.product_id": productId
    },
        {
            '$set': {
                'products.$.quantity': quantity
            }
        })
    req.flash("success", "Cập nhật thành công");
    res.redirect("back");
}