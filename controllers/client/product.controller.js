const Product = require("../../models/product.model");

//[GET]: /product
module.exports.index = async (req, res) => {
    const productList = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" });

    const newProductList = productList.map(item => {
        item.priceNew = (item.price * (10 - item.discount) / 10).toFixed(0);
        return item;
    })
    res.render("client/pages/products", {
        pageTitle: "Trang sản phẩm",
        productList: newProductList
    })
};

//[GET]: /product/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    try {
        const find = {
            deleted: false,
            slug: slug,
            status: "active"
        };
        const productDetail = await Product.findOne(find);
        if(!productDetail){
            return res.redirect("/product");
        }
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiet san pham",
            product: productDetail
        })
    } catch (error) {
        res.redirect("/product");
    }
}