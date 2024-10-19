const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./product.route.js");
const restoreRoute = require("./restore.route.js");
const PATH_ADMIN = require("../../config/system.js");
// export module
module.exports = (app) => {
    app.use(`${PATH_ADMIN.prefixAdmin}/dashboard`, dashboardRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/product`, productRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/restore`, restoreRoute);
}
  