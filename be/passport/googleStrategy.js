const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require("dotenv").config();

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',

    }, function (accessToken, refreshToken, profile, done) {
        const socialId = profile.id;
        const nickname = profile.displayName;
        const profileImageUrl = profile.photos[0].value;
    }));
};