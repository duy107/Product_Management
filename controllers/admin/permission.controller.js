const Role = require("../../models/role.model");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/permission", {
        pageTitle: "Phân quyền",
        records: records
    });
}

module.exports.changePermission = async (req, res) => {
    const data = JSON.parse(req.body.permission);
    for (const item of data) {
        await Role.updateOne({_id: item.id}, {permissions: item.permissions})
    }
    res.redirect("back");
}