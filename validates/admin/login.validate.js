module.exports.loginPost = (req, res, next) => {
    const {email, password} = req.body;
    if(!email){
        req.flash("error", "Email không để trống!");
        res.redirect("back");
        return;
    }

    if(!password){
        req.flash("error", "Mật khẩu không để trống!");
        res.redirect("back");
        return;
    }
    next();
}
