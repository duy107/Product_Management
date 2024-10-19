//[GET]: /admin/product
const config = require("../../config/system")
const Product = require("../../models/product.model");
const filterButtonHelper = require("../../helpers/filterButton");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const getTimeHelper = require("../../helpers/getTime");

//[GET]: /admin/product
module.exports.product = async (req, res) => {

    const queryStatus = req.query.status;
    const queryKeyword = req.query.keyword;
    const queryPage = req.query.page;

    const filterButtons = filterButtonHelper(queryStatus);

    // options
    let find = {
        deleted: false
    }
    // status
    if (queryStatus) {
        find.status = queryStatus;
    }

    // search
    const objectSearch = searchHelper(queryKeyword);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // lấy số lượng documents theo điều kiện find
    const numberProducts = await Product.countDocuments(find);

    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        numberProducts,
        queryPage
    );

    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/product", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterButtons: filterButtons,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH]: /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash('success', 'Update success!');
    res.redirect('back')
}

// [PATH]: /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    if (type == "delete-all") {
        await Product.updateMany(
            { _id: { $in: ids } },
            {
                $set: {
                    deleted: true,
                    deletedAt: getTimeHelper()
                }
            }
        )
    } else if (type == "change-position") {
        for (const item of ids) {
            const [id, position] = item.split("-");
            await Product.updateOne(
                { _id: id },
                { position: position }
            )
        }
    } else {
        await Product.updateMany(
            { _id: { $in: ids } },
            { $set: { status: type } },
            { multi: true }
        );
    }
    res.redirect("back");
}

//[DELETE]: /admin/product/delete-item/:id
// module.exports.deleteItem = async (req, res) => {
//     const id = req.params.id;
//     await Product.deleteOne({_id: id});
//     res.redirect("/admin/product");
// }
//[DELETE]: /admin/product/delete-item/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: getTimeHelper() });
    res.redirect("/admin/product");
}

//[GET]: /admin/product/create-product
module.exports.createProduct = (req, res) => {
    res.render("admin/pages/product/create.pug", {
        pageTitle: "Tạo mới sản phẩm"
    })
}
//[POST]: /admin/product/create-product
module.exports.createProductPost = async (req, res) => {
    const data = req.body;
    data.price = parseInt(data.price);
    data.quantity = parseInt(data.quantity);
    data.discount = parseInt(data.discount);

    const numberProduct = await Product.countDocuments();
    if (data.position == "") {
        data.position = numberProduct + 1;
    } else {
        data.position = parseInt(data.position);
    }
    if (req.file) {
        data.image = `/uploads/${req.file.filename}`;
    }
    const newProduct = new Product(data);
    await newProduct.save();
    res.redirect(`${config.prefixAdmin}/product`);
}

//[PATCH]: /admin/product/update/:id
module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            deleted: false,
            _id: id
        };
        const product = await Product.findOne(find);
        res.render("admin/pages/product/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error", "Id không tồn tại");
        res.redirect(`${config.prefixAdmin}/product`);
    }
}

//[PATCH]: /admin/product/update/:id
module.exports.updatePatch = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    data.price = parseInt(data.price);
    data.quantity = parseInt(data.quantity);
    data.discount = parseInt(data.discount);
    data.position = parseInt(data.position);
    if (req.file) {
        data.image = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({_id: id}, req.body);
        res.redirect("back");
    } catch (error) {
    }
}