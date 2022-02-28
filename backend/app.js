const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');

const isProduction = environment === 'production';  // check environment is production

const app = express();

// middlewares
app.use(morgan('dev')); // log info about requests and responses

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// security
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// set headers to better secure your app
// app.use(helmet({
//     contentSecurityPolicy: false
// }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// set the _csrf token and create req.csrfToken method
// the _csrf cookie is http-only and will be added to any server response
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

// error handling
// for unhandled requests
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// process sequelize errors if error is a sequelize error
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// format errors before returning a json response
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
