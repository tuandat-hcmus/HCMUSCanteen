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
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login page'
    });
});
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Signup page'
    });
});

app.get("/bills", (req, res) => {
    res.render("bills", {
        title: "Bills",
    });
});

app.get("/cashier", (req, res) => {
    res.render("cashier", {});
});

app.get("/cashier/bill", (req, res) => {
    res.render("cashier_bill", {
        title: "report page",
    });
});

app.get("/cashier/report", (req, res) => {
    res.render("cashier_report", {
        title: "report page",
    });
});
app.get("/cashier/import", (req, res) => {
    res.render("cashier_import", {
        title: "import page",
    });
});


app.get("/admin", (req, res) => {
    res.render("admin", {
        title: "admin page",
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
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
