const User = require("../../models/user.model");
module.exports.addFriend = (res) => {
    const myId = res.locals.user.id;
    _io.once("connection", (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (user_id) => {
            // add id of A inside acceptFriends of B
            const existAinB = await User.findOne({
                _id: user_id,
                acceptFriends: myId
            });
            if (!existAinB) {
                await User.updateOne({
                    _id: user_id
                }, {
                    $push: { acceptFriends: myId }
                })
            }
            // add id of B inside requestFriends of A
            const existBinA = await User.findOne({
                _id: myId,
                requestFriends: user_id
            });
            if (!existBinA) {
                await User.updateOne({
                    _id: myId
                }, {
                    $push: { requestFriends: user_id }
                })
            }
            // cập nhập số lời mời của B
            const inforB = await User.findOne({ _id: user_id }).select("acceptFriends");
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT", {
                user_id: user_id,
                lengthAccept: inforB.acceptFriends.length
            })
            // cập nhập lời mời đã gửi của A
            socket.emit("SERVER_RETURN_LENGTH_REQUEST", res.locals.user.requestFriends.length)

            // hiển thị thông tin của A ra danh sách lời mời của B
            socket.broadcast.emit("SERVER_RETURN_INFOR_ACCEPT", {
                user_id: user_id,
                inforA: {   
                    id: res.locals.user.id,
                    fullName: res.locals.user.fullName,
                    avatar: res.locals.user.avatar
                }
            })
        })
    })
}

module.exports.deletedRequest = (res, page = "") => {
    const myId = res.locals.user.id;
    _io.once("connection", (socket) => {
        socket.on("CLIENT_DELETE_FRIEND", async (user_id) => {
            if (!page) {
                _io.emit("SERVER_DELETE_FRIEND", user_id);
            }
            // _io.emit("SERVER_RELOAD", "reload");
            // delete id of A from acceptFriends of B
            const existAinB = await User.findOne({
                _id: user_id,
                acceptFriends: myId
            });
            if (existAinB) {
                await User.updateOne({
                    _id: user_id
                }, {
                    $pull: { acceptFriends: myId }
                })
            }
            // delete id of B from requestFriends of A
            const existBinA = await User.findOne({
                _id: myId,
                requestFriends: user_id
            });
            if (existBinA) {
                await User.updateOne({
                    _id: myId
                }, {
                    $pull: { requestFriends: user_id }
                })
            }
            // cập nhập số lời mời của B
            const inforB = await User.findOne({ _id: user_id }).select("acceptFriends");
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT", {
                user_id: user_id,
                lengthAccept: inforB.acceptFriends.length
            })
            // cập nhập lời mời đã gửi của A
            const inforA = await User.findOne({ _id: myId }).select("requestFriends");
            socket.emit("SERVER_RETURN_LENGTH_REQUEST", inforA.requestFriends.length)
        })
    })
}

module.exports.refuseFriend = (res) => {
    const myId = res.locals.user.id;
    _io.once("connection", (socket) => {
        socket.on("CLIENT_REFUSE_FRIEND", async (user_id) => {
            // remove id of B from acceptFriends of A
            const existBinA = await User.findOne({
                _id: myId,
                acceptFriends: user_id
            });
            if (existBinA) {
                await User.updateOne({
                    _id: myId
                }, {
                    $pull: { acceptFriends: user_id }
                })
            }
            // // remove id of A from requestFriends of B
            const existAinB = await User.findOne({
                _id: user_id,
                requestFriends: myId
            });
            if (existAinB) {
                await User.updateOne({
                    _id: user_id
                }, {
                    $pull: { requestFriends: myId }
                })
            }
            // cập nhập số lời mời của B
            const inforB = await User.findOne({ _id: user_id }).select("acceptFriends");
            _io.emit("SERVER_RETURN_LENGTH_ACCEPT", {
                user_id: myId,
                lengthAccept: inforB.acceptFriends.length
            })
        })
    })
}

module.exports.acceptFriend = (res) => {
    const myId = res.locals.user.id;
    _io.once("connection", (socket) => {
        socket.on("CLIENT_ACCEPT_FRIEND", async (user_id) => {
            // remove id of B from acceptFriends of A
            // add id of B inside frienList of A
            const existBinA = await User.findOne({
                _id: myId,
                acceptFriends: user_id
            });
            if (existBinA) {
                await User.updateOne({
                    _id: myId
                }, {
                    $push: {
                        friendList: {
                            user_id: user_id,
                            room_chat_id: ""
                        }
                    },
                    $pull: { acceptFriends: user_id }
                })
            }
            // remove id of A from requestFriends of B
            // add id of A inside frienList of B
            const existAinB = await User.findOne({
                _id: user_id,
                requestFriends: myId
            });
            if (existAinB) {
                await User.updateOne({
                    _id: user_id
                }, {
                    $push: {
                        friendList: {
                            user_id: myId,
                            room_chat_id: ""
                        }
                    },
                    $pull: { requestFriends: myId }
                })
            }
        })
    })
}