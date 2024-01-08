const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.c');
const billController = require('../controllers/bill.c');


router.get('/', (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        const birth = new Date(req.user.NgaySinh);
        res.render('dashboard', {
            title: 'Cashier Dashboard',
            isCashier: true,
            isDashboard: true,
            user: req.user,
            age: new Date().getFullYear() - birth.getFullYear() | 0,
            role: "Nhân viên",
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/bills', async (req, res) => {
    if (req.user && req.user.LaNhanVien === '1') {
        const bills = await billController.getBill();
        res.render('bill', {
            title: 'Bills',
            isCashier: true,
            isBill: true,
            user: req.user,
            bills: bills,
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
            user: req.user
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
            user: req.user
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