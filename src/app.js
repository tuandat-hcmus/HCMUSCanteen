const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
//---
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('sendOrder', (data) => {
        console.log(data);
        io.to('employees').emit('orders', data);
    });

    socket.on('identify', (userData) => {
        if (userData && userData.role === 'khach') {
            console.log("customer");
            socket.join('customers');
        } else if (userData && userData.role === 'nv') {
            console.log("employee");
            socket.join('employees');
        }
    });

    socket.on('disconnect', () => {
        console.log('disconnected: ', socket.id);
    })
});

