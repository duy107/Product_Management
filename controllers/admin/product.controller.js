//[GET]: /admin/product
const config = require("../../config/system")
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const Account = require("../../models/account.model");
const filterButtonHelper = require("../../helpers/filterButton");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const getTimeHelper = require("../../helpers/getTime");
const createTree = require("../../helpers/createTree");
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

    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    for (const product of products) {
        const user = await Account.findOne({ _id: product.createdBy.account_id });
        if (user) {
            product.createdBy.fullName = user.fullName;
        }

        const userLastUpdated = product.updatedBy.slice(-1)[0];

        if (userLastUpdated) {
            const detail = await Account.findOne({ _id: userLastUpdated.account_id });
            userLastUpdated.fullName = detail.fullName;
        }
    }

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

// [DELETE]: /admin/product/delete-item/:id
// module.exports.deleteItem = async (req, res) => {
//     const id = req.params.id;
//     await Product.deleteOne({ _id: id });
//     res.redirect("/admin/product");
// }
//[DELETE]: /admin/product/delete-item/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    });
    res.redirect("/admin/product");
}

//[GET]: /admin/product/create-product
module.exports.createProduct = async (req, res) => {
    const find = {
        deleted: false
    };
    try {
        // throw new Error("Ngoại lệ đã xảy ra!");
        const records = await Category.find(find);
        const newRecords = createTree(records);
        res.render("admin/pages/product/create.pug", {
            pageTitle: "Tạo mới sản phẩm",
            records: newRecords
        })
    } catch (error) {
        res.send("Đã xảy ra lỗi trong quá trình xử lý");
    }
}
//[POST]: /admin/product/create-product
module.exports.createProductPost = async (req, res) => {
    const permissions = res.locals.role.permissions;
    if (permissions.includes("products_create")) {
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

        data.createdBy = {
            account_id: res.locals.user.id
        }
        // if (req.file) {
        //     data.image = `/uploads/${req.file.filename}`;
        // }
        const newProduct = new Product(data);
        await newProduct.save();
        res.redirect(`${config.prefixAdmin}/product`);
    } else {
        res.send("Không có quyền");
    }
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
        const records = await Category.find({ deleted: false });
        const newRecords = createTree(records);
        res.render("admin/pages/product/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            records: newRecords
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
    // if (req.file) {
    //     data.image = `/uploads/${req.file.filename}`;
    // }
    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        }
        await Product.updateOne({ _id: id }, {
            ...req.body,
            $push: { updatedBy: updatedBy }
        });
        res.redirect("back");
    } catch (error) {
    }
}