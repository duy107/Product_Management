const socket = require("../../socket/client/users.socket");
const User = require("../../models/user.model");
module.exports.notFriend = async (req, res) => {
    socket.deletedRequest(res, "notFriend");
    socket.addFriend(res);
    const user_id = res.locals.user.id;
    const inforMyUser = await User.findOne({_id: user_id});
    const requestFriends = inforMyUser.requestFriends;
    const acceptFriends = inforMyUser.acceptFriends;
    const users = await User.find({
        // _id: {$nin: [...requestFriends, user_id, ...acceptFriends]},
        $and: [
            {_id: {$ne: user_id}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}}
        ],
        status: "active",
        deleted: false
    }).select("id avatar fullName");
    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách bạn bè",
        users: users
    });
}

module.exports.requestFriend = async (req, res) => {
    socket.deletedRequest(res);
    const myId = res.locals.user.id;
    const userInfor = await User.findOne({_id: myId});
    const users = await User.find({
        _id: {$in: userInfor.requestFriends},
        deleted: false,
        status: "active"
    });
    res.render("client/pages/users/request-friend.pug", {
        pageTitle: "Lời mời đã gửi",
        users: users
    })
}
module.exports.acceptFriend = async (req, res) => {
    socket.refuseFriend(res);
    socket.acceptFriend(res);
    const myId = res.locals.user.id;
    const userInfor = await User.findOne({_id: myId});
    const users = await User.find({
        _id: {$in: userInfor.acceptFriends},
        deleted: false,
        status: "active"
    });
    res.render("client/pages/users/accept-friend.pug", {
        pageTitle: "Lời mời kết bạn",
        users: users
    })
}