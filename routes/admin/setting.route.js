const express = require("express");
const controller = require("../../controllers/admin/setting.controller");
const route = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// const storageMulter = require("../../helpers/storageMulter");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();
route.get("/general", controller.general);
route.patch('/general',
    upload.single("logo"),
    uploadCloud.upload,
    controller.generalPatch)
module.exports = route;
