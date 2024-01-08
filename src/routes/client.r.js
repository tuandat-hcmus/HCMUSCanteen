const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.c');


router.get('/bills', (req, res) => {
    if (req.user && req.user.LaKhachHang === '1') {
        res.render("user_bill", {
            title: "Client Bills Page",
            isUser: true,
        });
    }
    else {
        res.redirect('/login');
    }

});

router.get('/profile', (req, res) => {
    if (req.user && req.user.LaKhachHang === '1') {
        let name = '';
            let ggid = null;
            if (req.user) {
                if (req.user.HoTen !== undefined) name = req.user.HoTen;
                if (req.user.displayName !== undefined) {
                    name = req.user.displayName;
                    ggid = req.user.id;
                }
            }
        res.render("user_profile", {
            title: "Client Profile Page",
            isUser: true,
            user: req.user,
            username: name
        });
    }
    else {
        res.redirect('/login');
    }

})
router.get('/page', productController.getPage);
router.get('/', productController.index);

module.exports = router;