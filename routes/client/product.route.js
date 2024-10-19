const express = require("express");
const controller = require("../../controllers/client/product.controller");
// tao route
const route = express.Router();

route.get('/', controller.index);
route.get('/:slug', controller.detail);
module.exports = route;