const auth = require('./authorization');
const express = require('express');
const router = express.Router();
const User = require('../../models/user');


router.post('/login', (req, res, next) => {
    const {id, password} = req.body;

    User.findOne({'id': id, 'password': password})
    .select({'_id': false, '__v': false}).then(r => {
        if (r !== null) {
            const accessToken = auth.signToken(r);
            res.status(200).json({'accessToken': accessToken});
        } else {
            res.status(400).json({'error': 'login failed'});
        }
    })
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

router.get('/user', (req, res, next) => {
    var user;

    try {
        user = auth.verify(req.headers.authorization);
    } catch (e) { }

    if (user !== null) {
        User.findOne({'id': user.id, 'password': user.password})
        .select({'_id': false, '__v': false}).then(r => {
            if (r !== null) {
                user = r;
                res.json(user);
            }
        })
    } else {
        res.json({'error': 'Not exist token'});
    }
});

module.exports = router;