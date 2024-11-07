const helperUpload = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model");
module.exports.chat = (res) => {
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const userId = res.locals.user.id;
            const images = [];
            for (const imagesBuffer of data.images) {
                images.push(await helperUpload(imagesBuffer));
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            });
            await chat.save();

            // tra lai mess cho client
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: res.locals.user.id,
                fullName: res.locals.user.fullName,
                content: data.content,
                images: images,
                chatId: chat.id
            })
        })

        // typing
        socket.on("CLIENT_SEND_TYPING", (message) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                user_id: res.locals.user.id,
                fullName: res.locals.user.fullName,
                type: message
            })
        })
        // delete message
        socket.on("CLIENT_DELETE_MESSAGE", async (chat_id) => {
            await Chat.deleteOne({ _id: chat_id });
            _io.emit("SERVER_DELETE_MESSAGE", chat_id);
        })
    });
}