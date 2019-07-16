const auth = require('../auth/authorization');
const express = require('express');
const Comment = require('../../models/menu').commentSchema;
const Menu = require('../../models/menu').menuSchema;
const User = require('../../models/user');

const router = express.Router();

function getUserFromToken (token) {
    try {
        return auth.verify(token);
    } catch (e) {
        return null;
    }
}

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
        var data = r;
        data.comments.reverse();

        res.send(data);
    });
});

router.post('/:menuName', function(req, res, next) {
    const user = getUserFromToken(req.headers.authorization);
    var order = req.body.order;

    if (order === 'like' || order === 'dislike') {
        if (req.body.hasOwnProperty('value')) {
            var value = req.body.value;
        } else {
            var value = 1;
        }

        if (value > 0) {
            var method = '$push';
        } else {
            var method = '$pull';
        }

        User.findOneAndUpdate({'id': user.id, 'password': user.password}, {[method]: {[order + "s"]: req.params.menuName}}, {'new': true})
        .then(r => {})
        .catch(e => console.error(e));

        Menu.updateOne({'name': req.params.menuName}, {'$inc': {[order]: value}}).then(r => {
            res.send({'success': Boolean(r.nModified)});
        });
    } else if (order === 'comment') {
        var comment = new Comment();

        User.findOne({'id': user.id, 'password': user.password})
        .then(r => {
            comment.id = r.id;
            comment.author = r.name;
            comment.content = req.body.content;

            Menu.updateOne({'name': req.params.menuName}, {'$push': {'comments': comment}})
            .then(r => res.send({'success': Boolean(r.nModified)}))
            .catch(e => console.error(e));
        })
    } else if (order === 'remove') {
        var _id = req.body._id;

        Menu.updateOne({'name': req.params.menuName}, {'$pull': {'comments': {'_id': _id}}})
        .then(r => res.send({'success': Boolean(r.nModified)}))
        .catch(e => console.error(e));
    }
});

module.exports = router;