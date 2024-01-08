const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');


router.get('/bills', (req, res) => {
    res.render("user_bill", {
        title: "Client Bills Page",
        isUser:true,
    });
});

router.get('/profile', (req, res) => {
    res.render("user_profile", {
        title: "Client Profile Page",
        isUser:true,
    });
})
router.get('/page', productController.getPage);
router.get('/', productController.index);

module.exports = router;