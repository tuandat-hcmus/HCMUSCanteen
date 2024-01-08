const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.c');


router.get('/', (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        res.render('dashboard', {
            title: 'Cashier Dashboard',
            isCashier: true,
            isDashboard: true,
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/bills', (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        res.render('bill', {
            title:'Bills',
            isCashier: true,
            isBill: true,
        })
    }
    else {
        res.redirect('/login');
    }
});

router.get('/report', (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        res.render('report', {
            title: 'Cashier Report',
            isCashier: true,
            isReport: true,
        });
    }
    else {
        req.redirect('/login');
    }
});

router.get('/profile', (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        res.render("user_profile", {
            title: "Cashier Profile Page",
            isCashier: true,
        });
    }
    else {
        req.redirect('/login');
    }
})

router.post('/loaddata', orderController.LoadPage);
router.get('/updatedata', orderController.UpdateData);
router.get('/getbilldetail', orderController.getBillDetail);


module.exports = router;