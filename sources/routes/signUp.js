const express = require('express');
const router = express.Router(); // eslint-disable-line
const User = require('../models/user');

// Retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(res.statusCode).json(users);
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
})

// Retrieve data from a specific user
router.get('/user', async (req, res) => {
    try {
        const user = await User.findById(req.body._id); // eslint-disable-line

        res.status(res.statusCode).json(user);
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
})

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        creationDate: new Date(),
        email: req.body.email,
        firstName: req.body.firstName,
        isconnected: false,
        lastName: req.body.lastName,
        lastUpdated: new Date(),
        password: req.body.password
    })

    try {
        // Search if the email already exists in the database
        const searchUser = User.find({ email: { $in: [req.body.email] } });

        if ((await searchUser).length === 0) {
            const savedUser = user.save();

            res.status(res.statusCode).json(savedUser);
        } else {
            res.status(409).send('409: Already exists');
        }
    } catch (err) {
        res.status(res.statusCode).json(err)
    }

})

// Delete a user by his id
router.delete('/', async (req, res) => {
    try {
        const deleteUser = await User.remove({ _id: req.body._id }); // eslint-disable-line

        res.status(res.statusCode).json(deleteUser);
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
})

module.exports = router;