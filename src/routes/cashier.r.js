const express = require('express');
const router = express.Router();

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

module.exports = router;