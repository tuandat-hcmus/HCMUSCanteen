const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    let username = null;
    let pw = null;
    // Nếu chưa đóng trình duyệt thì vẫn còn giữ đăng nhập
    // if (req.signedCookies.info) {
    //     const info = JSON.parse(req.signedCookies.info);
    //     username = info.u;
    //     pw = info.pw;
    // }
    // res.render('login', {
    //     username: username,
    //     password: pw,
    // });
    res.render('login', {
        title: 'Login page'
    });
});

router.post('/login', passport.authenticate('passport-login', {
    failureRedirect: '/',
    successRedirect: '/'
}), (req, res) => {
    try {
        const Username = req.body.username;
        const Password = req.body.password;
        const RememberPw = req.body.rememberPw;
        req.session.logined = true;
        if (RememberPw) {
            const info = { u: Username, pw: Password };
            const timeout = 60 * 60 * 1000;
            const expires = new Date(Date.now() + timeout);
            res.cookie('info', JSON.stringify(info), { signed: true, expires: expires });
        }
        else {
            res.clearCookie('info');
        }
    }
    catch (e) {
        console.log(e);
    }
    res.redirect('/');
});

router.get('/signup', (req, res) => {
    // res.render('signup');
    res.render('signup', {
        title: 'Signup page'
    });
});

router.post('/signup', passport.authenticate('passport-signup', {
    failureRedirect: '/',
    successRedirect: '/home'
}));

router.post('/logout', (req, res) => {
    delete req.session.logined;
    res.redirect('/');
})

module.exports = router;