const express = require("express");
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/register.validate");
const route = express.Router();

route.get('/register', controller.register);
route.post('/register', validate.register, controller.registerPost);
route.get('/login', controller.login);
route.post('/login', validate.login, controller.loginPost);
route.get('/logout', controller.logout);
route.get('/password/forgot', controller.forgot);
route.post('/password/forgot', validate.forgot, controller.forgotPost);
route.get('/password/otp', controller.otp);
route.post('/password/otp', controller.otpPost);
route.get('/password/reset', controller.reset);
route.post('/password/reset',validate.reset, controller.resetPost);
module.exports = route;     