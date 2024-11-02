const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const expiresCookie = 24 * 60 * 60 * 2000;
        const cart = new Cart({
            expiredAt: new Date(Date.now() + expiresCookie) 
        });
        await cart.save();
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiresCookie)});
    }else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });
        cart.totalProduct = cart.products.reduce((sum, item) => {
            return sum + item.quantity
        }, 0);
        res.locals.miniCart = cart;
    }
    next();
} 