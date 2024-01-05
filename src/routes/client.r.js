const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');

router.get('/page', productController.getPage);
router.get('/', productController.index);

module.exports = router;