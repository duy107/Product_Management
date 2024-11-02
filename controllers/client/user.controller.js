const User = require("../../models/user.model");
const Forgot = require("../../models/forgot-password.model");
const helper = require("../../helpers/generate");
const helperSendEmail = require("../../helpers/sendMail");
const md5 = require("md5");
module.exports.register = (req, res) => {
    res.render("client/pages/user", {
        pageTitle: "Đăng ký tài khoản"
    })
}
module.exports.registerPost = async (req, res) => {
    const { email } = req.body;
    const existEmail = await User.findOne({
        email: email,
        deleted: false
    });
    if (existEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.login = (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    })
}

module.exports.loginPost = async (req, res) => {
    const user = await User.findOne(
        {
            email: req.body.email,
            deleted: false
        }
    )
    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }
    if (md5(req.body.password) !== user.password) {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }
    if (user.status === "inactive") {
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

module.exports.forgot = (req, res) => {
    res.render("client/pages/user/forgot.pug", {
        pageTitle: "Quên mật khẩu"
    })
}
module.exports.forgotPost = async (req, res) => {
    const user = await User.findOne({ email: req.body.email, deleted: false }).select("email");
    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }
    const forgot = await Forgot.findOne({ email: req.body.email });
    const otp = helper.generateOtp(8);
    if (!forgot) {
        const objectForgot = {
            email: req.body.email,
            otp: otp,
            expireAt: Date.now() + 10000
        }
        const forgot = new Forgot(objectForgot);
        await forgot.save();
    }
    // res.send(`
    //     <form id="redirectForm" action="/user/password/otp" method="GET">
    //         <input type="hidden" name="email" value="${req.body.email}" />
    //     </form>
    //     <script>
    //         document.getElementById("redirectForm").submit();
    //     </script>
    // `);
    const subject = "Mã OTP xác thực mật khẩu";
    const content = `Mã OTP xác thực: <b>${otp}</b> (Hết hạn sau 3 phút)`;
    helperSendEmail.sendMail(req.body.email, subject, content);
    res.redirect(`/user/password/otp?email=${req.body.email}`);
}

module.exports.otp = (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otp.pug", {
        pageTitle: "Xác thực OTP",
        email: email
    })
}

module.exports.otpPost = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email, deleted: false }).select("email tokenUser");
    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    const forgot = await Forgot.findOne({
        email: email,
        otp: otp
    })

    if (!forgot) {
        req.flash("error", "Otp không hợp lệ!");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
}


module.exports.reset = (req, res) => {
    res.render("client/pages/user/reset.pug", {
        pageTitle: "Đổi mật khẩu"
    })
}
module.exports.resetPost = async (req, res) => {
    const { password } = req.body;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    })
    res.redirect("/");
}