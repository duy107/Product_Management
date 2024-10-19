// change one status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const statusCurrent = item.getAttribute("data-status");
            const id = item.getAttribute("data-id");
            const statusChange = (statusCurrent == "active" ? "inactive" : "active");
            const pathChangeStatus = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = pathChangeStatus;
            formChangeStatus.submit();
        })
    })
}

// change multi status
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    // checkbox all
    inputCheckAll.addEventListener('click', () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    // checkbox Id
    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            inputCheckAll.checked = (inputChecked.length == inputsId.length) ? true : false;
        })
    })
}

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxAll = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxAll.querySelectorAll("input[name='id']:checked");

        const type = e.target.elements.type.value;
        if (type == "delete-all") {
            const confirmDeleteAll = confirm("Bạn có đồng ý xóa?");
            if (!confirmDeleteAll) {
                return;
            }
        }
        if (inputsChecked.length > 0) {
            const input = formChangeMulti.querySelector("input[name='ids']");
            let ids = [];
            if (type == "change-position") {
                ids = Array.from(inputsChecked).reduce((total, item) => {
                    const position = item.closest("tr").querySelector("input[name='position']").value;
                    return [...total, `${item.value}-${position}`]
                }, [])
            } else {
                ids = Array.from(inputsChecked).reduce((total, item) => {
                    return [...total, item.value]
                }, []);
            }
            input.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Please choose at least one record");
        }
    })

}
