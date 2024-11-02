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