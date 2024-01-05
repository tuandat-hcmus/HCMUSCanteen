const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.c');

router.get("/dashboard", orderController.LoadPage);

// router.post('hasorder', orderController.ReFresh);

router.get("/bill", (req, res) => {
    res.render("bill", {
        title: "Bills",
        isBill: true,
        isCashier: true,
    });
});

router.get("/bill", (req, res) => {
    res.render("bill", {
        title: "bill page",
        isCashier: true,
        isBill: true,
    });
});

router.get("/report", (req, res) => {
    res.render("report", {
        title: "cashier_report page",
        isCashier: true,
        isReport: true,
    });
});

module.exports = router;