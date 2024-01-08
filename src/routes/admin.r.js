const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.c')

router.get('/', (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        const birth = new Date(req.user.NgaySinh);
        res.render("dashboard", {
            title:"Admin Dashboard Page",
             isAdmin: true,
             isDashboard: true,
             username: req.user.HoTen,
             age: new Date().getFullYear() - birth.getFullYear() | 0,
             role: "Admin",
             sex: req.user.GioiTinh,
             phone: req.user.SDT,
             email: req.user.Email,
             address: req.user.DiaChi
         });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/bills',async (req, res) => {
    if (req.user && req.user.LaAdmin === '1') {
        res.render("bill", {
            title: "Admin Bills Page",
            isAdmin: true,
            isBill: true,
            bills: await billController.getBill(),
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
            user: req.user
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;