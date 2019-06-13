const express = require('express');
const Menu = require('../../models/menu');

const router = express.Router();

router.get('/', function(req, res, next) {
    Menu.find().select({'_id': false, '__v': false}).then(r => {
        res.send({'menus': r});
    })
})

router.get('/:menuName', function(req, res, next) {
    Menu.findOne({'name': req.params.menuName}).select({'_id': false, '__v': false}).then(r => {
        res.send(r);
    });
});

router.post('/:menuName', function(req, res, next) {
    Menu.updateOne({'name': req.params.menuName}, {'$inc': {[req.body.order]: 1}}).then(r => {
        res.send({'success': Boolean(r.nModified)});
    })
})

module.exports = router;