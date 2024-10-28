const express = require("express");
const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/login.validate");
const route = express.Router();
route.get("/login", controller.login);
route.post("/login",
    validate.loginPost,
    controller.loginPost);
route.get("/logout", controller.logout);
module.exports = route;