const Setting = require("../../models/setting-general.model");
module.exports.general = async (req, res) => {
    const setting = await Setting.findOne({});
    res.render("admin/pages/setting/general.pug", {
        pageTitle: "Cài đặt chung",
        infor: setting
    })
}

module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await Setting.findOne({});
    if (settingGeneral) {
        await settingGeneral.updateOne({
            _id: settingGeneral.id
        }, req.body);
    } else {
        const setting = new Setting(req.body);
        await setting.save();
    }
    res.redirect("back");
}