const express = require("express");
const controller = require("../../controllers/admin/permission.controller");
const route = express.Router();
route.get("/", controller.index);
route.patch("/", controller.changePermission);
module.exports = route;
