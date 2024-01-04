require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AccountModel = require('../models/acc.m');
const bcrypt = require('bcrypt');
const saltBounds = 10;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Passport xử lí đăng nhập bằng gg
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://localhost:3000/gg/auth`
},
    async function (accessToken, refreshToken, profile, done) {
        // // const rs = await AccountModel.getUser(profile.name.givenName);
        // if (!rs) {
        //     try {
        //         // rs = new AccountModel(Fullname, Phone, Birth, Gender, Username, HashPW, Email, '0', '1', '0', null, null);
        //         // await AccountModel.insert(rs);
        //     }
        //     catch (e) {
        //         console.log("Passport login error: ", e);
        //     }

        // }
        // console.log(profile);
        done(null, profile);
    }
));

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
}