const express = require("express");
// tao route
const route = express.Router();
const controller = require("../../controllers/client/home.controller");
route.get('/', controller.index);

module.exports = route;