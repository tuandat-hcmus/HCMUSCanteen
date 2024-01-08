const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render("dashboard", {
            title:"Admin Dashboard Page",
             isAdmin: true,
             isDashboard: true,
         });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/bills', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render("bill", {
            title: "Admin Bills Page",
            isAdmin: true,
            isBill: true,
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/report', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render("report", {
            title: "Admin Report page",
            isAdmin: true,
            isReport: true,
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/import', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render('import', {
            title: "Admin Import Page",
            isAdmin: true,
            isReport: true,
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/profile', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render("user_profile", {
            title: "Admin Profile Page",
            isAdmin:true,
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;