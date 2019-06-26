const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = "945992092243-4nr84drg218d8l795mkb84qs2sv7j640.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "zkgOLL9dJvWQIp4NYCSfGGtR";

module.exports = () => {
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
        // const socialId = profile.id;
        // const nickname = profile.displayName;
        // const profileImageUrl = profile.photos[0].value;
        console.log(profile);
    }));
};