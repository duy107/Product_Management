const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./product.route.js");
const restoreRoute = require("./restore.route.js");
const categoryRoute = require("./category.route.js");
const roleRoute = require("./role.route.js");
const permissionRoute = require("./permission.route.js");
const accountRoute = require("./account.route.js");
const authnRoute = require("./auth.route.js");
const myAccountRoute = require("./my-account.route.js");
const PATH_ADMIN = require("../../config/system.js");

const middleware = require("../../middlewares/admin/auth.middleware.js");
// export module
module.exports = (app) => {
    app.use(`${PATH_ADMIN.prefixAdmin}/dashboard`, middleware.requireAuth, dashboardRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/product`, middleware.requireAuth, productRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/restore`, middleware.requireAuth, restoreRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/product-category`, middleware.requireAuth, categoryRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/role`, middleware.requireAuth, roleRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/permission`, middleware.requireAuth, permissionRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/account`, middleware.requireAuth, accountRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/my-account`, middleware.requireAuth, myAccountRoute);
    app.use(`${PATH_ADMIN.prefixAdmin}/auth`, authnRoute);
}
  