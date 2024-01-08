const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("dashboard", {
        title:"Admin Dashboard Page",
         isAdmin: true,
         isDashboard: true,
     });
});

router.get('/bills', (req, res) => {
    res.render("bill", {
        title: "Admin Bills Page",
        isAdmin: true,
        isBill: true,
    });
});

router.get('/report', (req, res) => {
    res.render("report", {
        title: "Admin Report page",
        isAdmin: true,
        isReport: true,
    });
});

router.get('/import', (req, res) => {
    res.render('import', {
        title: "Admin Import Page",
        isAdmin: true,
        isReport: true,
    });
});

router.get('/profile', (req, res) => {
    res.render("user_profile", {
        title: "Admin Profile Page",
        isAdmin:true,
    });
});

module.exports = router;