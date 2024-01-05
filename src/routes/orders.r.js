const express = require('express');
const router = express.Router();

router.post('/order', (req, res, next) => {
    res.send('order sent');
})

module.exports = router;