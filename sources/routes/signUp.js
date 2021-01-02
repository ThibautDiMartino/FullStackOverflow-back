import User from '../models/user.js';
import express from 'express';
const router = express.Router();

// Retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        return res.status(res.statusCode).send(users);
    } catch (err) {
        return res.status(res.statusCode).json(err);
    }
});

// Retrieve data from a specific user
router.get('/user', async (req, res) => {
    try {
        const user = await User.findById(req.body._id);

        res.status(res.statusCode).json(user);
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        creationDate: new Date(),
        email: req.body.email,
        firstName: req.body.firstName,
        friends: [],
        gender: req.body.gender,
        isConnected: true,
        isMatching: false,
        lastName: req.body.lastName,
        lastUpdated: new Date(),
        password: req.body.password,
        profilePicture: 'placeholder',
        room: null
    });

    try {
        // Search if the email already exists in the database
        const searchUser = await User.find({ email: { $in: req.body.email } });

        if (searchUser.length === 0) {
            const savedUser = await user.save();

            res.status(res.statusCode).json(savedUser);
        } else {
            res.status(409).send('409: Already exists');
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Delete a user by his id
router.delete('/', async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({ _id: req.body._id });

        res.status(res.statusCode).json(deleteUser);
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Delete a user by his id
router.delete('/multiple', (req, res) => {
    try {
        const deleteUser = [];

        req.body.ids.forEach(async (element) => {
            deleteUser.push(await User.deleteOne({ _id: element }));

        });
        res.status(res.statusCode).json(deleteUser);
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

export default router;