const express = require("express");
const middleware = require("../../middlewares/client/auth.middleware");
const controller = require("../../controllers/client/users.controller");
const route = express.Router();

route.get("/notFriend", middleware.requireAuth, controller.notFriend);

module.exports = route;