const express = require('express');
const router = express.Router();


router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/' //실패했을때
}), (req, res) => {
    console.log("로그인성공");
    res.redirect('/'); //성공했을때
});

module.exports = router;