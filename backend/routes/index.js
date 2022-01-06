const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    // serve frontend index.html at the root and provide XSRF-TOKEN cookie to the response

    // GET /
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());

        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // serve the static assets in the frontend build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // server frontend index.html file at all other routes not starting with /api

    // GET /* (not /api)
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

if (process.env.NODE_ENV !== 'production') {
    // add XSRF-TOKEN cookie in development

    // GET /api/csrf/restore
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}


module.exports = router;
