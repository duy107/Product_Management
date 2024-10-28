const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const middleware = require("../../middlewares/client/category.middleware");
// export module
module.exports = (app) => {
    app.use(middleware.productCategory);
    app.use("/", homeRoutes);
    app.use("/product", productRoutes);
}
  