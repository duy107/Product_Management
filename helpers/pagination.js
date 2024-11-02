module.exports = (objectPagination, numberProducts, queryPage) => {
  // lấy trang hiện tại từ URL
  if (queryPage) {
    objectPagination.currentPage = parseInt(queryPage);
  }
  // vị trí bắt đầu (bỏ qua số phần tử) = (trang hiện tại - 1) * số lượng  phần tử mỗi trang
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  objectPagination.numberPage = Math.ceil(numberProducts / objectPagination.limitItems);
  return objectPagination;
}