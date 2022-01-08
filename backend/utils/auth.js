const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// authentication middlewares
// set the jwt cookie after a user logs in or signs up
const setTokenCookie = (res, user) => {
    // create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) },
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie on the response
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
};

// restore the session based on the jwt cookie if the user is already logged in
const restoreUser = (req, res, next) => {
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        // verify that the user exists by searching the db for the user id in the jwt payload
        // if so, save the user into a key on the request
        // otherwise, clear the token cookie from the response
        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
}

// require user authentication before accessing a route
// if a valid jwt cookie exists, the session user will be loaded into req.user
// then, handle the error if no session user exists
const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;

        return next(err);
    }
];

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth
};
