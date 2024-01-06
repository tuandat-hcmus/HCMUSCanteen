const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');
const reportController = require('../controllers/report.c');

router.get('/page', productController.getPage);
router.get('/search', productController.getSearch);
router.get('/', productController.getType);
router.get('/report', reportController.getReports);

module.exports = router;