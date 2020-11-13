const express = require('express');
const router = express.Router(); // eslint-disable-line

router.get('/', (res) => {
    res.json({ status: res.statusCode });
})

module.exports = router;