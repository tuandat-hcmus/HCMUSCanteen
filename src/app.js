const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
//---
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.engine(
    ".hbs",
    hbs.engine({
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// set static files
app.use(express.static("public"));

//flash
app.use(flash());

//---
const https = require('https');
const fs = require('fs');
const secrect = 'mysecrectkey';
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secrect));
app.use(session({
    secret: secrect,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
require('./mws/ggpassport')(app);
require('./mws/fbpassport')(app);
require('./mws/passport')(app);

const route = require('./routes');
route(app);


app.get("/user/comment", (req, res) => {
    res.render("comment", {
        title: "user comment",
        image: "user1.jpg"
    });
});

const server = https.createServer({
    key: process.env.key,
    cert: process.env.cert
}, app);

server.listen(port, () => console.log(`Listening on port ${port}`));

const customer = new Set();
const employee = new Set();
const admin = new Set();
const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on('identify', (userData) => {
        if (userData && userData.role === 'khach') {
            socket.join('customers');
            customer.add(socket.id);
            console.log('Customer connected: ', socket.id);
        } else if (userData && userData.role.trim() === 'Nhân viên') {
            socket.join('employees');
            employee.add(socket.id);
            console.log('Employee connected: ', socket.id);
        } else if (userData && userData.role.trim() === 'Admin') {
            socket.join('admin');
            admin.add(socket.id);
            console.log('Admin connected: ', socket.id);
        }
    });

    socket.on('sendOrder', (data) => {
        if (data) {
            io.to('employees').emit('customerOrder', data);
            socket.emit('orderCallback', {data: 'Success'});
        }
        else {
            socket.emit('orderCallback', {data: 'Failed'});
        }
    });

    socket.on('disconnect', () => {
        if (customer.delete(socket.id)) console.log('Customer disconnected: ', socket.id);
        if (employee.delete(socket.id)) console.log('Employee disconnected: ', socket.id);
        if (admin.delete(socket.id)) console.log('Admin disconnected: ', socket.id);
    })
});

