// update quantity
const input = document.querySelectorAll("input[name='quantity']");
if(input.length > 0){
    input.forEach(item => {
        item.addEventListener("change", () => {
            const productId = item.getAttribute("productId");
            const quatity = item.value;
            window.location.href = `cart/update/${productId}/${quatity}`;
        })
    })
}