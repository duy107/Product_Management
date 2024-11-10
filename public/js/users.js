// import { refuseFriend } from "../helpers/buttonEvent";
// add friends
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (btnAddFriend.length > 0) {
    btnAddFriend.forEach(item => {
        item.addEventListener("click", () => {
            const boxUser = item.closest(".users");
            boxUser.classList.add("add");
            const user_id = item.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", user_id);
        })
    })
}

// delete friends
const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (btnCancelFriend.length > 0) {
    btnCancelFriend.forEach(item => {
        item.addEventListener("click", () => {
            const boxUser = item.closest(".users");
            boxUser.classList.remove("add");
            const user_id = item.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_DELETE_FRIEND", user_id);
        })
    })
}

// server delete user
socket.on("SERVER_DELETE_FRIEND", (user_id) => {
    const friends = document.querySelector(".friends");
    const btnDelete = document.querySelector(`[btn-cancel-friend="${user_id}"]`);
    const boxUser = btnDelete.closest(".friend-infor");
    friends.removeChild(boxUser);
})

// socket.on("SERVER_RELOAD", (type) => {
//     if(type="reload"){
//         window.location.reload();
//     }
// })


// refuse friends
const buttonRefuse = document.querySelectorAll("[btn-refuse-friend]");
if (buttonRefuse.length > 0) {
    buttonRefuse.forEach(item => {
        item.addEventListener("click", () => {
            const user_id = item.getAttribute("btn-refuse-friend");
            const boxUser = item.closest(".users");
            boxUser.classList.add("refuse");
            socket.emit("CLIENT_REFUSE_FRIEND", user_id);
        })
    })
}

// accept friends
const buttonAccept = document.querySelectorAll("[btn-accept-friend]");
if (buttonAccept.length > 0) {
    buttonAccept.forEach(item => {
        item.addEventListener("click", () => {
            const user_id = item.getAttribute("btn-accept-friend");
            const boxUser = item.closest(".users");
            boxUser.classList.add("accepted");
            socket.emit("CLIENT_ACCEPT_FRIEND", user_id);
        })
    })
}
// update invitation to make friends
const badgeAccept = document.querySelector("[badge-users-accept]");
if (badgeAccept) {
    socket.on("SERVER_RETURN_LENGTH_ACCEPT", (data) => {
        const user_id = badgeAccept.getAttribute("badge-users-accept");
        if (user_id === data.user_id) {
            badgeAccept.innerHTML = data.lengthAccept;
        }
    })
}
// update request send
const badgeRequest = document.querySelector("[badge-users-request]");
if (badgeRequest) {
    socket.on("SERVER_RETURN_LENGTH_REQUEST", (lengthRequest) => {
        badgeRequest.innerHTML = lengthRequest;
    })
}

// display infor A inside make friends of B
const row_data_user_accept = document.querySelector("[data-user-accept]");
if (row_data_user_accept) {
    socket.on("SERVER_RETURN_INFOR_ACCEPT", (data) => {
        const id = row_data_user_accept.getAttribute("data-user-accept");
        const div = document.createElement("div")
        div.classList.add("col-3", "mb-2", "friend-infor");
        div.innerHTML = `
            <div class="users">
                <div class="users__img">
                    <img src=${data.inforA.avatar} alt=${data.inforA.fullName}>
                </div>
                <div class="users__infor">
                    <div class="users__infor__name">${data.inforA.fullName}</div>
                    <div class="users__infor__action">
                        <button class="btn btn-primary btn-sm mr-1" btn-accept-friend=${data.inforA.id}>Chấp nhận</button>
                        <button class="btn btn-secondary btn-sm mr-1" btn-refuse-friend=${data.inforA.id} fdprocessedid="quiuh">Từ chối</button>
                        <button class="btn btn-secondary btn-sm mr-1" btn-deleted-friend="" disabled="">Đã xóa</button>
                        <button class="btn btn-secondary btn-sm mr-1" btn-accepted-friend="" disabled="">Đã chấp nhận</button>
                    </div>
                </div>
            </div>
        </div>`;
        if (id == data.user_id) {
            row_data_user_accept.appendChild(div);
            const buttonRefuseNew = div.querySelector("[btn-refuse-friend]");
            // refuseFriend(buttonRefuseNew);
            buttonRefuseNew.addEventListener("click", () => {
                const user_id = buttonRefuseNew.getAttribute("btn-refuse-friend");
                const boxUser = buttonRefuseNew.closest(".users");
                boxUser.classList.add("refuse");
                socket.emit("CLIENT_REFUSE_FRIEND", user_id);
            })
        }
    })
}

// const refuseFriend = (item) => {
//     button.addEventListener("click", () => {
//         const user_id = item.getAttribute("btn-refuse-friend");
//         const boxUser = item.closest(".users");
//         boxUser.classList.add("refuse");
//         socket.emit("CLIENT_REFUSE_FRIEND", user_id);
//     })
// }