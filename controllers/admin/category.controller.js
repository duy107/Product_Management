const Category = require("../../models/category.model");
const createTree = require("../../helpers/createTree");
const config = require("../../config/system");
// get: admin/product-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    try {
        const records = await Category.find(find);
        const tree = createTree(records);
        res.render("admin/pages/category", {
            pageTitle: "Danh mục sản phẩm",
            records: tree
        });
    } catch (error) {
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lý");
    }
}

// get: admin/product-category/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    };
    try {
        // throw new Error("Ngoại lệ đã xảy ra!");
        const records = await Category.find(find);
        const newRecords = createTree(records);
        res.render("admin/pages/category/create.pug", {
            pageTitle: "Tạo danh mục",
            records: newRecords
        });
    } catch (error) {
        res.send("Đã xảy ra lỗi trong quá trình xử lý");
    }
}

// post: admin/product-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const count = await Category.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    const newCategory = new Category(req.body);
    newCategory.save();
    res.redirect("back");
}

// get: admin/product-category/edit
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            deleted: false,
            _id: id
        }

        const records = await Category.find({ deleted: false });
        const tree = createTree(records);
        const data = await Category.findOne(find);
        res.render("admin/pages/category/edit.pug", {
            pageTitle: "Chinh sửa danh mục",
            data: data,
            records: tree
        })
    } catch (error) {
        res.redirect(`${config.prefixAdmin}/product-category`);
    }
}

// patch: admin/product-category/edit
module.exports.editPatch = async (req, res) => {
    req.body.position = parseInt(req.body.position);
    await Category.updateOne({ _id: req.params.id }, req.body);
    res.redirect("back");
}