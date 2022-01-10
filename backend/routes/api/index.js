const express = require('express')
const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const categoriesRouter = require('./categories.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/events', eventsRouter);

module.exports = router;
