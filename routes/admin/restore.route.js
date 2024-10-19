const express = require("express");
const controller = require("../../controllers/admin/restore.controller");
const route = express.Router();

route.get("/", controller.restore);
route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changMulti);
route.patch("/change-deleted/:id", controller.changeDeleted);
module.exports = route;
