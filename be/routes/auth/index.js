const express = require('express');
const passport = require('passport');
var User = require('../../models/user');
const router = express.Router();
const {
    isLoggedIn,
    isNotLoggedIn
} = require("../../check/check");
// const {
//     isNotLoggedIn
// } = require('../../check');

// router.post('/login', (req, res, next) => {
//     passport.authenticate("user", (authError, user, info) => {
//         if (authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if (!user) {
//             req.flash('loginError', info.message);
//             return res.redirect('http://localhost:8080');
//         }
//         return req.login(user, (loginError) => {
//             if (loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return res.redirect('http://localhost:8080');
//         });
//     })(req, res, next);
// });

router.post('/login', (req, res, next) => {
    User.findOne({'id': req.body.id, 'password': req.body.password})
    .select({'_id': false, '__v': false}).then(r => {
        if (r !== null) {
            res.status(200).json(r);
        }
        else {
            res.status(400).send({
                'id': req.body.id,
                'password': req.body.password
            });
        }
    });
})

router.post('/signup', (req, res, next) => {
    const user = new User({
        id: req.body.id,
        password: req.body.password,
        name: req.body.name
    });

    User.countDocuments({'id': user.id}, (err, count) => {
        if (!count) {
            console.log('New user created');
            
            user.save()
            .then(result => {
                console.log(result);
                res.status(201).json(result);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }
        else {
            console.log("This user is alreay exist");
            res.status(409).send(user);
        }
    })
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// router.get('/google',
//     passport.authenticate('google', {
//         scope: ['openid', 'email']
//     }),
//     function (req, res) {
//         // The request will be redirected to Google for authentication, so this
//         // function will not be called.
//     });

// router.get('/google/callback', passport.authenticate('google', {
//     failureRedirect: 'http://localhost:3000/auth/google' //실패했을때
// }), (req, res) => {
//     console.log("로그인 성공" + req.user);
//     res.redirect('http://localhost:8080/'); //성공했을때
// });

module.exports = router;