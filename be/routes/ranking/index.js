const express = require('express');
const Menu = require('../../models/menu').menuSchema;

const router = express.Router();

router.get('/', function(req, res, next) {
    Menu.find().sort({"like": -1, "dislike": 1}).limit(10).select({'_id': false, '__v': false}).then(r => {
        res.send({
            'data': r
        });
    });
});

module.exports = router;