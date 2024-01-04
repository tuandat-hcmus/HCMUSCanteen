const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;
const hbs = require("express-handlebars");

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

app.get("/home", (req, res) => {
    res.render("home", {
        title: "Home Page",
        isHome: true,
        isUser: true,
    });
});
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login page",
    });
});
app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Signup page",
    });
});

app.get("/cashier/bill", (req, res) => {
    res.render("bill", {
        title: "Bills",
        isBill: true,
        isCashier: true,
    });
});

app.get("/cashier/dashboard", (req, res) => {
    res.render("dashboard", {
       title:"Cashier dashboard page",
        isCashier: true,
        isDashboard: true,
        
    });
    
});

app.get("/cashier/bill", (req, res) => {
    res.render("bill", {
        title: "bill page",
        isCashier: true,
        isBill: true,
    });
});

app.get("/cashier/report", (req, res) => {
    res.render("report", {
        title: "cashier_report page",
        isCashier: true,
        isReport: true,
    });
});

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
        isUser:true,
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


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
