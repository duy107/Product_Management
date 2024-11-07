const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
//[GET]: /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistics = {
        category: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,   
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }
    statistics.product.total = await Product.countDocuments({deleted: false});
    statistics.product.active = await Product.countDocuments({deleted: false, status: "active"});
    statistics.product.inactive = await Product.countDocuments({deleted: false, status: "inactive"});

    statistics.category.total = await Category.countDocuments({deleted: false});
    statistics.category.active = await Category.countDocuments({deleted: false, status: "active"});
    statistics.category.inactive = await Category.countDocuments({deleted: false, status: "inactive"});

    statistics.user.total = await User.countDocuments({deleted: false});
    statistics.user.active = await User.countDocuments({deleted: false, status: "active"});
    statistics.user.inactive = await User.countDocuments({deleted: false, status: "inactive"});

    statistics.account.total = await Account.countDocuments({deleted: false});
    statistics.account.active = await Account.countDocuments({deleted: false, status: "active"});
    statistics.account.inactive = await Account.countDocuments({deleted: false, status: "inactive"});
    res.render("admin/pages/dashboard", {
        pageTitle: "Trang tổng quan",
        statistics: statistics
    })
}