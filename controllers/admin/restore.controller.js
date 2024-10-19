const Product = require("../../models/product.model");
const filterButton = require("../../helpers/filterButton");
const search = require("../../helpers/search");
module.exports.restore = async (req, res) => {

    const status = req.query.status;

    let find = {
        deleted: true
    }

    if (status) {
        find.status = status;
    }

    const objectSearch = search(req.query.keyword);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    const products = await Product.find(find);
    res.render("admin/pages/restore", {
        pageTitle: "Khôi phục sản phẩm",
        keyword: objectSearch.keyword,
        products: products,
        filterButtons: filterButton(status || "")
    })
}

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    res.redirect('back');
}

module.exports.changMulti = async (req, res) => {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    if (type == "restore-all") {
        await Product.updateMany(
            { _id: { $in: ids } },
            {
                $set: { deleted: false },
                $unset: { deletedAt: ""}
            },
            { multi: true }
        )
    } else {
        await Product.updateMany(
            { _id: { $in: ids } },
            { $set: { status: type } },
            { multi: true }
        )
    }
    res.redirect("back");
    redirect
}
module.exports.changeDeleted = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        { _id: id },
        {
            $set: { deleted: false },
            $unset: { deletedAt: "" }
        }
    );
    res.redirect("back");
}