const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');

router.get('/:slug', productController.show);

module.exports = router;