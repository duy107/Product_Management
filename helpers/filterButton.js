module.exports = (queryStatus = "") => {
    let filterButtons = [
        {
            name: 'Tất cả',
            status: "",
            class: ""
        },
        {
            name: 'Hoạt động',
            status: "active",
            class: ""
        },
        {
            name: 'Dừng hoạt động',
            status: "inactive",
            class: ""
        }
    ];

    // add class active
    if (queryStatus) {
        const index = filterButtons.findIndex(item => item.status == queryStatus);
        filterButtons[index].class = "active";
    } else {
        const index = filterButtons.findIndex(item => item.status == "");
        filterButtons[index].class = "active"
    }

    return filterButtons;
}