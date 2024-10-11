const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

// export module
module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/product", productRoutes);
}
  