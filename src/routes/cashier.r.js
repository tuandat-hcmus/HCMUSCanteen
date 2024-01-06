const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.c');


router.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'Cashier Dashboard',
        isCashier: true,
        isDashboard: true,
    })
});

router.get('/bills', (req, res) => {
    res.render('bill', {
        title:'Bills',
        isCashier: true,
        isBill: true,
    })
});

router.get('/report', (req, res) => {
    res.render('report', {
        title: 'Cashier Report',
        isCashier: true,
        isReport: true,
    })
});

router.get('/profile', (req, res) => {
    res.render("user_profile", {
        title: "Cashier Profile Page",
        isCashier: true,
    });
})

router.post('/loaddata', orderController.LoadPage);
router.get('/updatedata', orderController.UpdateData);


module.exports = router;