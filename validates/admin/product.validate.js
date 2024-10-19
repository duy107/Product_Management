module.exports.createProduct = (req, res, next) => {
    const data = req.body;
    if (data.title == "") {
        req.flash('error', 'Không để trống!');
        res.redirect("back");
        return;
    }
    next();
}