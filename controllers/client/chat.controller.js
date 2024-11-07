const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const sockect = require("../../socket/client/chat.socket");
module.exports.index = async (req, res) => {
    sockect.chat(res);
    const chats = await Chat.find({
        deleted: false
    });
    for(const item of chats){
        const user = await User.findOne({
            _id: item.user_id,
            deleted: false
        }).select("fullName")
        item.userInfor = user;
    }
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    })
}