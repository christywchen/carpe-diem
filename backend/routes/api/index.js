const express = require('express')
const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const categoriesRouter = require('./categories.js');
const venuesRouter = require('./venues.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/categories', categoriesRouter);
router.use('/venues', venuesRouter);

module.exports = router;
