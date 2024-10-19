// button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    const url = new URL(window.location.href);
    buttonStatus.forEach(item => {
        item.addEventListener("click", () => {
            const data_status = item.getAttribute("button-status");
            if (!!data_status) {
                url.searchParams.set("status", data_status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url;
        })
    })
}

// search

const formSearch = document.querySelector("#form-search");
if (formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (!!keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url;
    })
}

// change status
const buttonChangeStatus = document.querySelectorAll("[data-id]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            const status = item.getAttribute("data-status");
            const newStatus = (status == "active") ? "inactive" : "active";
            const newPath = path + `/${newStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = newPath;
            formChangeStatus.submit();
        })
    })
}

// change all
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']");
    const inputCheckItem = checkboxMulti.querySelectorAll("input[name='checkItem']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputCheckItem.forEach(item => {
                item.checked = true;
            })
        } else {
            inputCheckItem.forEach(item => {
                item.checked = false;
            })

        }   
    })

    inputCheckItem.forEach(item => {
        item.addEventListener("click", () => {
            const numberChecked = checkboxMulti.querySelectorAll("input[name='checkItem']:checked");
            inputCheckAll.checked = (numberChecked.length == inputCheckItem.length) ? true : false;
        })
    })
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkMulti = document.querySelector("[checkbox-multi]");
        const checkboxSelected = checkMulti.querySelectorAll("input[name='checkItem']:checked");
        if(checkboxSelected.length >  0){
            const input = formChangeMulti.querySelector("input[name='ids']");
            const ids = Array.from(checkboxSelected).reduce((total, item) => {
                return [...total, item.value];
            }, []); 
            input.value = ids.join(", ");
            formChangeMulti.submit();
        }else {
            alert("Can chon it nhat 1 san pham");
        }
    })
}

// restore

const buttonRestore = document.querySelectorAll("[button-restore]");
if(buttonRestore.length > 0){
    const formRestore = document.querySelector("#form-restore");
    const path = formRestore.getAttribute("data-path");
    buttonRestore.forEach(item => {
        item.addEventListener("click", () => {
            const newPath = path + `/${item.value}?_method=PATCH`;
            formRestore.action = newPath;
            formRestore.submit();
        })
    })
}