module.exports.newPrice = (products) => {
    const newProductList = products.map(item => {
        item.priceNew = (item.price * (100 - item.discount) / 100).toFixed(0);
        return item;
    })
    return newProductList;
}

module.exports.newPriceOneProduct = (product) => {
    return parseInt((product.price * (100 - product.discount) / 100).toFixed(0));
}