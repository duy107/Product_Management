module.exports.register = (req, res, next) => {
    const {fullName, email, password} = req.body;


    if(!fullName){
        req.flash("error", "Tên không để trống!");
        res.redirect("back");
        return;
    }
    if(!email){
        req.flash("error", "Email không để trống!");
        res.redirect("back");
        return;
    }
    if(!password){
        req.flash("error", "Password không để trống!");
        res.redirect("back");
        return;
    }
    
    next();
}

module.exports.login = (req, res, next) => {
    const {email, password} = req.body;
    if(!email){
        req.flash("error", "Email không để trống!");
        res.redirect("back");
        return;
    }
    if(!password){
        req.flash("error", "Password không để trống!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.forgot = (req, res, next) => {
    if(!req.body.email){
        req.flash("error", "Email không để trống!");
        res.redirect("back");
        return;
    }
    next();
}
module.exports.reset = (req, res, next) => {
    const {password, confirmPassword} = req.body;
    if(!password){
        req.flash("error", "Password không để trống!");
        res.redirect("back");
        return;
    }
    if(!confirmPassword){
        req.flash("error", "Vui lòng xác nhận mật khẩu!");
        res.redirect("back");
        return;
    }

    if(password !== confirmPassword){
        req.flash("error", "Mật khẩu không khớp!");
        res.redirect("back");
        return;
    }
    next();
}