const express = require("express");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// const storageMulter = require("../../helpers/storageMulter");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();

// tao route
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
route.get('/', controller.product);
route.patch('/change-status/:status/:id', controller.changeStatus);
route.patch('/change-multi', controller.changeMulti);
route.delete('/delete-item/:id', controller.deleteItem);
route.get('/create-product', controller.createProduct);
route.post('/create-product',
    upload.single("image"),
    uploadCloud.upload,
    validate.createProduct,
    controller.createProductPost)
route.get('/update/:id', controller.update);
route.patch('/update/:id', upload.single("image"), controller.updatePatch);
module.exports = route;