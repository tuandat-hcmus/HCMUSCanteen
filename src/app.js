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

// app.use(accountRouter);
const route = require('./routes');
route(app);

app.get("/admin/report", (req, res) => {
    res.render("report", {
        title: "amdin_report page",
        isAdmin: true,
        isReport: true,
    });
});

app.get("/admin/bill", (req, res) => {
    res.render("bill", {
        title: "amdin_report page",
        isAdmin: true,
        isBill: true,
    });
});
app.get("/admin/dashboard", (req, res) => {
    res.render("dashboard", {
       title:"Admin dashboard page",
        isAdmin: true,
        isDashboard: true,
        
    });
    
});



app.get("/admin/import", (req, res) => {
    res.render("import", {
        title: "import page",
        isCashier: true,
        isImport: true,
    });
});

app.get("/admin", (req, res) => {
    res.render("admin", {
        title: "admin page",
        isAdmin:true,
        isDashboard:true,
    });
});

app.get("/user/comment", (req, res) => {
    res.render("comment", {
        title: "user comment",
        
    });
});

app.get("/user/profile", (req, res) => {
    res.render("user_profile", {
        title: "user profile page",
        isUser: true,
        user: req.user
    });
});

app.get("/user/bill", (req, res) => {
    res.render("user_bill", {
        title: "user bill page",
        isUser:true,
    });
});

app.get("/cashier/profile", (req, res) => {
    res.render("user_profile", {
        title: "cashier profile page",
        isCashier: true,
    });
});

app.get("/admin/profile", (req, res) => {
    res.render("user_profile", {
        title: "admin profile page",
        isAdmin:true,
    });
});


// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });

const orderRouter = require('./routes/orders.r');
const { get } = require('http');
app.use(orderRouter);
app.get('/customer', (req, res) => {
    if (req.user.LaNhanVien !== '0')
        res.render('home');
    else
        res.render('test1', {
            role: 'khach'
        });
});
app.get('/employee', (req, res) => {
    if (req.user.LaNhanVien === '1')
        res.render('test2', {
            role: 'nv'
        });
    else
        res.render('home');
})

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
        console.log(userData);
        if (userData && userData.role === 'khach') {
            socket.join('customers');
            customer.add(socket.id);
            console.log('Customer connected: ', socket.id);
        } else if (userData && userData.role === 'nv') {
            socket.join('employees');
            employee.add(socket.id);
            console.log('Employee connected: ', socket.id);
        } else if (userData && userData.role === 'admin') {
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