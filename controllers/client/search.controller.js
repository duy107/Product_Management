const Product = require("../../models/product.model");
const helperProduct = require("../../helpers/product");
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let searchProduct = [];
    if(keyword){
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
            title: regex,
            status: "active",
            deleted: false
        })
        searchProduct = helperProduct.newPrice(products);
    }
    res.render("client/pages/search/index", {
        pageTitle: "Tìm kiếm sản phẩm",
        keyword: keyword,
        products: searchProduct
    })
}