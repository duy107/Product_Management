const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const md5 = require('md5');
const config = require("../../config/system");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await Account.find(find).select("-token -password").lean({ virtuals: true });
    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role;
    }
    res.render("admin/pages/account/", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

module.exports.create = async (req, res) => {
    const roles = await Role.find();
    res.render("admin/pages/account/create", {
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}

module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    if(emailExist){
        req.flash("error", "Email da ton tai!");
        res.redirect("back"); 
    }else{
        req.body.password = md5(req.body.password);
        req.body.createBy = {
            account_id: res.locals.user.id
        }
        const account = new Account(req.body);
        await account.save();
        res.redirect(`${config.prefixAdmin}/account`)
    }
}

module.exports.edit = async (req, res) => {
    const roles = await Role.find();
    const id = req.params.id;
    try {
        const find = {
            _id: id,
            deleted: false
        };
        const record = await Account.findOne(find).select("-password -token");
        res.render("admin/pages/account/edit",{
            pageTitle: "Edit account",
            record: record,
            roles: roles
        }
        )
    } catch (error) {
        res.redirect(`${config.prefixAdmin}/account`)
    }
}


module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    });
    if(emailExist){
        req.flash("error", "Email da ton tai!");
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password;
        }
        await Account.updateOne({_id: id}, req.body);
    }
    res.redirect("back");
}