export const refuseFriend = (button) => {
    button.addEventListener("click", () => {
        const user_id = item.getAttribute("btn-refuse-friend");
        const boxUser = item.closest(".users");
        boxUser.classList.add("refuse");
        socket.emit("CLIENT_REFUSE_FRIEND", user_id);
    })
}