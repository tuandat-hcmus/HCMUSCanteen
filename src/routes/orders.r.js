const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.c');
const multer = require('multer');
const upload = multer();
router.use(upload.none()); 

router.post('/order', orderController.AddBill);

module.exports = router;