// cấu hình express
const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;


// đưa các file trong public ra public
app.use(express.static('public'));

// sử dụng pug
app.set('views', './views');
app.set('view engine', 'pug');

// import router
const route = require("./routes/client/index.route");

// goi cac ham route
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})