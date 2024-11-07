// cấu hình express
const express = require('express');
const app = express();
var path = require('path');
const moment = require("moment");

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

// app local variable (su dụng cho pug)
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

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

// soket io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io; // tao bien cho toan bo project

// goi cac ham route
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
  res.render("client/pages/errors/404.pug")
})
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})