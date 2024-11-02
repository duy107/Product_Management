const Product = require("../../models/product.model");
const helper = require("../../helpers/product");
//[GET]: /
module.exports.index = async (req, res) => {
    
    // san phham noi bat
    const products = await Product.find({
        status: "active",
        featured: "1",
        deleted: false
    }).limit(3).sort({position: "desc"});
    const newProducts = helper.newPrice(products);
    
    // san pham moi nhat
    const latestProduct = await Product.find({
        status: "active",
        deleted: false
    }).limit(6).sort({position: "desc"});
    const newLatestProducts = helper.newPrice(latestProduct);
    res.render("client/pages/home", {
        pageTitle: "Trang chủ",
        products: newProducts,
        latestProducts: newLatestProducts
    })
}