const express = require('express');
const Menu = require('../../models/menu');

const router = express.Router();

router.get('/:menuName', function(req, res, next) {
    Menu.findOne({'name': req.params.menuName}).then(r => {
        res.send({
            'name': r.name,
            'like': r.like,
            'dislike': r.dislike
        });
    });
});

router.post('/:menuName', function(req, res, next) {
    console.log(req.params.menuName);
    console.log(req.body);

    res.send({'msg': 'hi'});

    // var body = req.body;
    
    // if (body.order === 'like') {
    //     console.log('like');
    // }
    // else if (body.order === 'dislike') {
    //     console.log('dislike');
    // }

    // Menu.updateOne({'name': req.params.menuName}, {$set: }).then(r => {
    //     console.log(r);
    // })
})

module.exports = router;