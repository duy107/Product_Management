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

}


// permission checked
const dataRecords = document.querySelector("[data-records]");
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    records.forEach((item, index) => {
        item.permissions.forEach(subItem => {
            const row = tablePermission.querySelector(`[data-name="${subItem}"]`);
            const inputs = row.querySelectorAll("input")[index];
            inputs.checked = true;
        })
    })
}