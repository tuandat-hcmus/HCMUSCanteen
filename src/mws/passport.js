const passport = require('passport');
const MyStrategy = require('../utils/customSPP');
const accModel = require('../model/acc.m');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.Username);
});
passport.deserializeUser(async (username, done) => {
    const user = await accModel.getUser(username);
    if (!user) {
        return done('Invalid', null);
    }
    done(null, user);
});

passport.use('passport-login', new MyStrategy(async (req, username, password, done) => {
    const rs = await accModel.getUser(username);
    if (rs) {
        auth = await bcrypt.compare(password, rs.Password);
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
    const rs = await accModel.getUser(username);
    if (!rs) {
        const Fullname = req.body.fullanme;
        const Phone = req.body.phone;
        const Birth = req.body.birth;
        const Gender = req.body.gender;
        const Username = req.body.username;
        const Password = req.body.password;
        const HashPW = await bcrypt.hash(Password, saltBounds);
        // Mặc định là khách hàng 
        rs = new User(Fullname, Phone, Birth, Gender, Username, HashPW, '0', '1', '0', '', '');
        await accModel.insert(rs);
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