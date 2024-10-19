// delete
const buttonDelete = document.querySelectorAll("[button-delete-item]");
if (buttonDelete.length > 0) {
    buttonDelete.forEach(button => {
        const formDelete = document.querySelector("#form-delete-item");
        const path = formDelete.getAttribute("data-path");
        button.addEventListener("click", () => {
            if (confirm("Xác nhận xóa?")) {
                const id = button.getAttribute("data-id");
                const newPath = path + `/${id}?_method=DELETE`;
                formDelete.action = newPath;
                formDelete.submit();
            }
        })
    })
}

// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const timeHidden = parseInt(showAlert.getAttribute("time-hidden"));
    const hiddentAlert = document.querySelector("[hidden-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
        showAlert.remove();
    }, timeHidden);

    hiddentAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
        showAlert.remove();
    })
}

//preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const uploadImageClose = uploadImage.querySelector("[upload-image-close]");
    if(uploadImagePreview.src == ""){
       document.querySelector(".preview-image").classList.add("hidden");
    }
    uploadImageInput.addEventListener("change", (e) => {
        // create URL for image
        uploadImageClose.classList.remove("hidden");
        const [file] = e.target.files;
        uploadImagePreview.src = URL.createObjectURL(file);
        document.querySelector(".preview-image").classList.remove("hidden");
    })
    uploadImageClose.addEventListener('click', () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
        uploadImageClose.classList.add("hidden")
    })
}