const express = require('express');

const router = express.Router();

router.use('/meal', require('./meal'))

router.all('*', function(req, res, next) {
    res.send({msg: "API doesn't exists."});
});

module.exports = router;