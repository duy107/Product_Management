const express = require("express");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();
const controller = require("../../controllers/admin/category.controller");
const route = express.Router();

route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create",
    upload.single("image"),
    uploadCloud.upload,
    controller.createPost
);
route.get("/edit/:id", controller.edit);
route.patch("/edit/:id",
    upload.single("image"),
    uploadCloud.upload,
    controller.editPatch);
module.exports = route;
