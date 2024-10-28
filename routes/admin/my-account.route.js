const express = require('express')
const controller = require("../../controllers/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();
const route = express.Router();
route.get("/", controller.index);
route.get("/edit", controller.edit);
route.patch("/edit",
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch
)
module.exports = route;