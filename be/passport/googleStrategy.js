const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

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
        // try {
        console.log('후훗:' + profile);
        // const exUser = await User.find({
        //     where: {
        //         snsId: profile.id,
        //         provider: 'kakao'
        //     }
        // });
        // if (exUser) {
        //     done(null, exUser);
        // } else {
        //     const newUser = await User.create({
        //         email: profile._json && profile._json.kaccount_email,
        //         nick: profile.displayName,
        //         snsId: profile.id,
        //         provider: 'kakao',
        //     });
        //     done(null, newUser);
        // }
        // } catch (error) {
        //     console.error(error);
        //     done(error);
        // }
        done(null, null);
    }));
};