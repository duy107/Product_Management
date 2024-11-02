const express = require("express");
const controller = require("../../controllers/client/cart.controller");
const route = express.Router();

route.post('/add/:productId', controller.addPost);
route.get('/', controller.index);
route.get('/delete/:productId', controller.delete);
route.get('/update/:productId/:quantity', controller.update);
module.exports = route;