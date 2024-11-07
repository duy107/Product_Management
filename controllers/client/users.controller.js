const User = require("../../models/user.model");
module.exports.notFriend = async (req, res) => {
    const user_id = res.locals.user.id;
    const users = await User.find({
        _id: {$ne: user_id},
        status: "active",
        deleted: false
    }).select("id avatar fullName");
    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách bạn bè",
        users: users
    });
}