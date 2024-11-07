const mongoose = require("mongoose");
const settingGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
}, {
    timestamps: true
});
const Setting = mongoose.model('Setting', settingGeneralSchema, "setting-general");

module.exports = Setting;