const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:  `https://localhost:3000/fb/auth`,
},
function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    return done(null, profile);
}));

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
}