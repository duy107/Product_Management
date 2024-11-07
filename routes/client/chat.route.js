const authMiddleware = require("../../middlewares/client/auth.middleware");
const express = require("express");
const controller = require("../../controllers/client/chat.controller.js");
const route = express.Router();
route.get("/",authMiddleware.requireAuth, controller.index);
module.exports = route;