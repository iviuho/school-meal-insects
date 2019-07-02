const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

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

    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(profile); //??? ??
        // console.log(profile._json.email); //?
        // console.log(profile.id);
        try {
            const exUser = await User.find({
                where: {
                    snsId: profile.id
                }
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json.email,
                    snsId: profile.id
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};