const Category = require("../../models/category.model");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    try {
        const records = await Category.find(find);
        res.render("admin/pages/category", {
            pageTitle: "Danh mục sản phẩm",
            records: records
        });
    } catch (error) {

    }
}

module.exports.create = (req, res) => {
    res.render("admin/pages/category/create.pug");
}

module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const count = await Category.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const newCategory = new Category(req.body);
    newCategory.save();
    res.redirect("back");
}