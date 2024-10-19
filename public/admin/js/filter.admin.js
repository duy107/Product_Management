const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(item => {
        item.addEventListener('click', () => {
            const status = item.getAttribute("button-status");
            if (!!status) {
                url.searchParams.set("status", status);
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
    let url = new URL(window.location.href);
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
 
// pagination
const numberPage = document.querySelectorAll("[button-pagination]");
if (numberPage.length > 0) {
    let url = new URL(window.location.href);
    numberPage.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute("button-pagination");
            url.searchParams.set('page', page);
            window.location.href = url
        });
    })
}