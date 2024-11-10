import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js";
const upload = new FileUploadWithPreview('upload-images', {
    maxFileCount: 6,
    multiple: true,
});
const formSendMessage = document.querySelector(".chat__form");
if (formSendMessage) {
    formSendMessage.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = e.target.elements.message.value;
        const images = upload.cachedFileArray;
        if (message || images.length > 0) {
            // socket ở file sockect.js và đc nhúng trc file chat.js nên dùng đc
            socket.emit('CLIENT_SEND_MESSAGE', {
                content: message,
                images: images
            });
            e.target.elements.message.value = '';
            socket.emit("CLIENT_SEND_TYPING", "hidden");
            upload.resetPreviewPanel();
        }
    })
}

//SERVER_RETURN_MESSAGE
const boxTyping = document.querySelector(".chat__list-typing");
if (boxTyping) {
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
        const myId = document.querySelector("[my-id]").getAttribute("my-id");
        const body = document.querySelector(".chat__body");
        const div = document.createElement("div")
        div.classList.add("chat__box");
        let htmlBody = "";
        let htmlContent = "";
        let htmlImage = "";
        let htmlDelete = "";
        if (data.userId == myId) {
            div.classList.add("chat__outgoing");
        } else {
            div.classList.add("chat__incomming");
            htmlBody = `<div class="chat__name"> ${data.fullName} </div>`;
        }
        if (data.content) {
            htmlContent = data.content;
        }
        if (data.images.length > 0) {
            htmlImage = "<div class='chat__image'>";
            for (const img of data.images) {
                htmlImage += `<img src=${img}>`;
            }
            htmlImage += "</div>";
        }
        if (htmlContent || htmlImage) {
            htmlDelete += `<div class='btn btn-light btn-sm chat__delete' chat_id=${data.chatId}> <i class='fa-solid fa-trash'></i> </div>`
        }
        div.innerHTML = `
                        ${htmlDelete}
                        ${htmlBody}
                        <div class="chat__content"> ${htmlContent} </div>
                        ${htmlImage}
                        `;

        body.insertBefore(div, boxTyping);
        body.scrollTop = body.scrollHeight;
        const gallery = new Viewer(div);
        deleteMessage();
    })
}
//END SERVER_RETURN_MESSAGE

// scroll to bottom
const body = document.querySelector(".chat__body");
if (body) {
    body.scrollTop = body.scrollHeight;
}
// endscroll to bottom


//emoji-picker
const button = document.querySelector('.button');
const tooltip = document.querySelector('.tooltip');
Popper.createPopper(button, tooltip);
button.onclick = () => {
    tooltip.classList.toggle('shown')
}
//end emoji-picker

// show and hidden tpying
var timeout;
const hanndleTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}

// insert icon
document.querySelector('emoji-picker')
    .addEventListener('emoji-click', (e) => {
        const inputMessage = document.querySelector(".chat__form input[name='message']");
        inputMessage.value += e.detail.unicode;
        hanndleTyping();

        inputMessage.setSelectionRange(inputMessage.value.length, inputMessage.length);
        inputMessage.focus();
    });
// end insert icon

// typing
const inputMessage = document.querySelector(".chat__form input[name='message']");
if (inputMessage) {
    inputMessage.addEventListener("keyup", () => {
        hanndleTyping();
    });
}
//server_return_typing
const listTyping = document.querySelector(".chat__list-typing");
if (listTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        const body = document.querySelector(".chat__body");
        if (data.type == "show") {
            const exitsTying = document.querySelector(`div[user_id="${data.user_id}"]`);
            if (!exitsTying) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("chat__box-typing");
                boxTyping.setAttribute("user_id", data.user_id);
                boxTyping.innerHTML = `
                <div class="chat__box-typing__name">${data.fullName}</div>
                <div class="chat__box-typing__dots">
                <span></span>
                <span></span>
                <span></span>
                </div>
                `;
                listTyping.appendChild(boxTyping);
                body.scrollTop = body.scrollHeight;
            }
        } else {
            const boxTyping = listTyping.querySelector(`div[user_id="${data.user_id}"]`);
            if (boxTyping) {
                listTyping.removeChild(boxTyping);
            }
        }
    })
}
// end typing

//preview full image
const bodyPreviewFullImage = document.querySelector(".chat__body");
const gallery = new Viewer(bodyPreviewFullImage);

// delete message
const deleteMessage = () => {
    const buttonDeleteMessage = document.querySelectorAll("[chat_id]");
    if (buttonDeleteMessage.length > 0) {
        buttonDeleteMessage.forEach(item => {
            item.addEventListener("click", () => {
                const chat_id = item.getAttribute("chat_id");
                socket.emit("CLIENT_DELETE_MESSAGE", chat_id);
            })
        })
    }
}
deleteMessage();
socket.on("SERVER_DELETE_MESSAGE", (chat_id) => {
    const bodyDelete = document.querySelector(".chat__body");
    const buttonDelete = document.querySelector(`div[chat_id="${chat_id}"]`);
    const chatBox = buttonDelete.closest(".chat__box");
    bodyDelete.removeChild(chatBox);
})
// end delete message