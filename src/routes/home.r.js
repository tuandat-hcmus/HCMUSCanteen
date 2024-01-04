const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');

router.get('/home', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    });
});

router.get('/home/page', productController.getPage);

module.exports = router;