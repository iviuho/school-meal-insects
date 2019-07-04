const express = require('express');
const passport = require('passport');
const router = express.Router();
// const {
//     isNotLoggedIn
// } = require('../../check');


router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['openid', 'email']
    }),
    function (req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    });

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/auth/google' //실패했을때
}), (req, res) => {
    console.log("로그인 성공" + req.user);
    res.redirect('http://localhost:8080/'); //성공했을때
});

module.exports = router;