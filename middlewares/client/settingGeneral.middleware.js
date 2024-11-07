const Setting = require("../../models/setting-general.model");
module.exports.setting = async (req, res, next) => {
    const settingGeneral = await Setting.findOne({});
    res.locals.settingGeneral = settingGeneral;
    next();
}