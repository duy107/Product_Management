// permission
const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
    const button = document.querySelector("[button-submit]");

    button.addEventListener("click", () => {
        let permission = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        Array.from(rows).forEach(row => {

            const inputs = row.querySelectorAll("input");
            const name = row.getAttribute("data-name");
            if (name === "id") {
                inputs.forEach(item => {
                    permission.push({
                        id: item.value,
                        permissions: []
                    })
                })
            } else {
                inputs.forEach((item, index) => {
                    const checked = item.checked;
                    if (checked) {
                        permission[index].permissions.push(name);
                    }
                })
            }
        })
        if (permission.length > 0) {
            const formPermission = document.querySelector("#form-change-permission");
            const inputPermission = formPermission.querySelector("input[name='permission']");
            inputPermission.value = JSON.stringify(permission);
            formPermission.submit();
        }
    })

    // permission all
    const trAll = tablePermission.querySelector("tr[data-name='all']")
    const inputAll = trAll.querySelectorAll("input");
    const rows = tablePermission.querySelectorAll("[data-name]");
    inputAll.forEach((item, index) => {
        item.addEventListener("click", () => {
            const checked = item.checked;
            Array.from(rows).forEach(row => {
                const name = row.getAttribute("data-name");
                if (name !== "id" && name !== "all") {
                    const inputs = row.querySelectorAll("input");
                    const correspondingCheckbox = inputs[index];
                    correspondingCheckbox.checked = checked;
                }
            })
        })
    }) 
    Array.from(rows).forEach(row => {
        const name = row.getAttribute("data-name");
        if (name !== "id" && name !== "all") {
            const inputs = row.querySelectorAll("input");

            inputs.forEach((input, colIndex) => {
                input.addEventListener("change", () => {
                    // Kiểm tra trạng thái của tất cả checkbox trong cùng cột
                    const isAllChecked = Array.from(rows)
                        .filter(row => {
                            const rowName = row.getAttribute("data-name");
                            return rowName !== "id" && rowName !== "all";
                        })
                        .every(row => {
                            const columnCheckbox = row.querySelectorAll("input")[colIndex];
                            return columnCheckbox.checked;
                        });

                    // Cập nhật trạng thái checkbox "Tất cả" tương ứng
                    inputAll[colIndex].checked = isAllChecked;
                });
            });
        }
    });
}


// permission checked
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    records.forEach((item, index) => {
        item.permissions.forEach(subItem => {
            const row = tablePermission.querySelector(`[data-name="${subItem}"]`);
            const inputs = row.querySelectorAll("input")[index];
            inputs.checked = true;
        })
    })
}
