const express = require('express');
const router = express.Router();
const User = require('../../models/user');


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

module.exports = router;