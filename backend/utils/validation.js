const { validationResult } = require('express-validator');

// middleware validate request body
// format errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        // create an error with all the validation error messages
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.'
        next(err);
    }

    next();
}

module.exports = {
    handleValidationErrors
}
