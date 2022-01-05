const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';  // check environment is production

const app = express();

// middlewares
app.use(morgan('dev')); // log info about requests and responses

app.use(cookieParser());
app.use(express.json());

// security
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// set headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));

// set the _csrf token and create req.csrfToken method
// the _csrf cookie is hhtp-only and will be added to any server response
// it also adds a method on all requests that will be set to another cookie for csrf protection
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

// routers
app.use(routes);

module.exports = app;
