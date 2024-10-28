const md5 = require("md5");
const config = require("../../config/system");
const Account = require("../../models/account.model");
module.exports.login = (req, res) => {
    if(req.cookies.token){
        res.redirect(`${config.prefixAdmin}/dashboard`);
    }else{
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Đăng nhập"
        })
    }
}

module.exports.loginPost = async (req, res) => {
    const {email, password} = req.body;
    const record  = await Account.findOne({
        deleted: false,
        email: email
    });
    if(!record){  
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(password) != record.password){
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }
    
    if(record.status == "inactive"){
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }
    res.cookie("token", record.token);
    res.redirect(`${config.prefixAdmin}/dashboard`);
}
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${config.prefixAdmin}/auth/login`);
}
