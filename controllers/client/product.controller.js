const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const config = require("../../config/system");
const helper = require("../../helpers/product");
const helperCategory = require("../../helpers/category");
//[GET]: /product
module.exports.index = async (req, res) => {
    const productList = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" });

    const newProductList = helper.newPrice(productList);
    res.render("client/pages/products", {
        pageTitle: "Danh sách sản phẩm",
        productList: newProductList
    })
};


//[GET]: /product/:slugCategory
module.exports.productByCategory = async (req, res) => {
    const slug = req.params.slugCategory;
    try {
        const category = await Category.findOne({
            slug: slug,
            deleted: false
        });

        const listSubCategory = await helperCategory.getCategory(category.id);
        
        const subIds = listSubCategory.reduce((arr, item) => {
            return [...arr,item.id]}, [category.id]);
            
        const products = await Product.find({
            deleted: false,
            category_id: { $in: subIds}
        })
        const newProductList = helper.newPrice(products);
        res.render("client/pages/products", {
            pageTitle: category.title,
            productList: newProductList
        })

    } catch (error) {
        res.redirect(`${config.prefixAdmin}/product`)
    }
}

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
        if(productDetail.category_id){
            const category = await Category.findOne({
                _id: productDetail.category_id,
                status: "active",
                deleted: false
            })
            productDetail.category = category;
        }
        productDetail.newPrice = helper.newPriceOneProduct(productDetail);
        if (!productDetail) {
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