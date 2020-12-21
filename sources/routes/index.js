// const express = require('express');
import express from 'express';
// const cool = require('cool-ascii-faces');
const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
    res.render('index', { title: 'express' });
});

export default router;