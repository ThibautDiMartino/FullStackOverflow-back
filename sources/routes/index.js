const express = require('express');
const cool = require('cool-ascii-faces');
const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
    res.send(cool());
})

module.exports = router;