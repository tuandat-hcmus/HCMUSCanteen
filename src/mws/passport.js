const passport = require('passport');
const MyStrategy = require('../utils/customSPP');
const AccountModel = require('../model/acc.m');
const bcrypt = require('bcrypt');
const saltBounds = 10;

passport.serializeUser((user, done) => {
    done(null, user.UserName);
});
passport.deserializeUser(async (username, done) => {
    const user = await AccountModel.getUser(username);
    done(null, user);
});

passport.use('passport-login', new MyStrategy(async (req, username, password, done) => {
    const rs = await AccountModel.getUser(username);
    if (rs) {
        auth = await bcrypt.compare(password, rs.MatKhau);
    }
    if (auth) {
        return done(null, rs);
    }
    done('Invalid auth');
}, {
    username: 'username',
    password: 'password'
}));

passport.use('passport-signup', new MyStrategy(async (req, username, password, done) => {
    let rs = await AccountModel.getUser(username);
    if (!rs) {
        try {
            const Fullname = req.body.fullname;
            const Phone = req.body.phone;
            const Birth = req.body.birth;
            const Gender = req.body.gender;
            const Username = req.body.username;
            const Password = req.body.password;
            const HashPW = await bcrypt.hash(Password, saltBounds);
            // Mặc định là khách hàng 
            rs = new AccountModel(Fullname, Phone, Birth, Gender, Username, HashPW, '0', '1', '0', null, null);
            console.log(rs);
            await AccountModel.insert(rs);
        } catch (e) {
            console.log("Passport signup error", e);
        }
        return done(null, rs);
    }
    done('Invalid auth');
}, {
    username: 'username',
    password: 'password'
}));

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
}