const router = require('express').Router();

module.exports = router;

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});
