const express = require('express');
const Comment = require('../../models/menu').commentSchema;
const Menu = require('../../models/menu').menuSchema;

const router = express.Router();

router.get('/', function(req, res, next) {
    Menu.find().select({'_id': false, '__v': false}).then(r => {
        res.send({
            'length': r.length,
            'menus': r
        });
    })
})

router.get('/:menuName', function(req, res, next) {
    Menu.findOne({'name': req.params.menuName}).select({'_id': false, '__v': false}).then(r => {
        res.send(r);
    });
});

router.post('/:menuName', function(req, res, next) {
    var order = req.body.order;

    if (order === 'like' || order === 'dislike') {
        Menu.updateOne({'name': req.params.menuName}, {'$inc': {[order]: 1}}).then(r => {
            res.send({'success': Boolean(r.nModified)});
        });
    }
    else if (order === 'comment') {
        var comment = new Comment();
        comment.author = req.body.author;
        comment.content = req.body.content;

        Menu.updateOne({'name': req.params.menuName}, {'$push': {'comments': comment}}).then(r => {
            res.send({'success': Boolean(r.nModified)});
        })
    }
});

module.exports = router;