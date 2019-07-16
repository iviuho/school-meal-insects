const jwt = require('jsonwebtoken');
const secret = process.env.COOKIE_SECRET;

const auth = {
    signToken (user) {
        return jwt.sign({'id': user.id, 'password': user.password}, secret);
    },
    ensureAuth () {
        return (req, res, next) => {
            const {authorization} = req.headers;

            if (!authorization) {
                res.status(401);
                throw Error('No authorization headers');
            }

            try {
                req.user = this.verify(authorization)
            } catch (e) {
                res.status(401);
                throw e;
            }

            next();
        }
    },
    verify (token) {
        return jwt.verify(token.replace(/^Bearer\s/, ''), secret);
    }
}

module.exports = auth;
