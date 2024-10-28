const Role = require("../../models/role.model");
const config = require("../../config/system");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/role/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

module.exports.create = (req, res) => {
    res.render("admin/pages/role/create.pug");
}

module.exports.createPost = async (req, res) => {
    try {
        req.body.createBy = {
            account_id: res.locals.user.id
        }
        const role = new Role(req.body);
        await role.save();
        res.redirect(`${config.prefixAdmin}/role`);
    } catch (error) {
        res.send("Error");
    }
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            _id: id,
            deleted: false
        };
        const record = await Role.findOne(find);
        res.render(`admin/pages/role/edit.pug`, {
            pageTile: "Chỉnh sửa quyền",
            record: record
        });
    } catch (error) {
        res.redirect(`${config.prefixAdmin}/role`);
    }
}

module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật thành công.");
        res.redirect(`${config.prefixAdmin}/role`);
    } catch (error) {
        req.flash("error", "Cập nhật thất bại");
    }
}