const Category = require("../../models/category.model");
const createTree = require("../../helpers/createTree");
module.exports.productCategory = async (req, res, next) => {
    const listCategory = await Category.find({
        deleted: false
    });
    const productCategory = createTree(listCategory);
    res.locals.productCategory = productCategory;
    next();
} 