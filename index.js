// cấu hình express
const express = require('express');
const app = express();
var path = require('path');

// (notification) express flash
var flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser('trinhcongduy'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash()); 

// tynimce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// cau hinh body-parse de xu ly data tu form len sever
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// cau hinh orverride methood
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// import config system variables
const systemConfig = require(`${__dirname}/config/system`);

// app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// import file .env
require('dotenv').config();
const port = process.env.PORT;


// đưa các file trong public ra public (su dung trong pug)
app.use(express.static(`${__dirname}/public`));

// sử dụng pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// import router
const route = require(`${__dirname}/routes/client/index.route`);
const routeAdmin = require(`${__dirname}/routes/admin/index.route`);


// connect database
const mongo = require(`${__dirname}/config/database`);
mongo.connect();

// goi cac ham route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})