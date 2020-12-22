import User from '../models/user.js';
import express from 'express';
const router = express.Router();

// List all connected users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isConnected: { $in: true } });

        return res.status(res.statusCode).send(users);
    } catch (err) {
        return res.status(res.statusCode).json(err);
    }
});

// connect a user
router.post('/login', async (req, res) => {
    try {
        const searchConnectedUser = await User.find({
            email: { $in: req.body.email },
            password: { $in: req.body.password }
        });

        if (searchConnectedUser.length > 0) {
            const updateUser = await User.findByIdAndUpdate(
                searchConnectedUser[0]._id,
                { isConnected: true }
            );

            res.status(res.status(res.statusCode).json(updateUser));
        } else {
            res.status(res.status(res.statusCode).json(searchConnectedUser));
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// connect a user
router.post('/logout', async (req, res) => {
    try {
        const searchConnectedUser = await User.find({
            email: { $in: req.body.email }
        });

        if (searchConnectedUser.length > 0) {
            const updateUser = await User.findByIdAndUpdate(
                searchConnectedUser[0]._id,
                { isConnected: false }
            );

            res.status(res.status(res.statusCode).json(updateUser));
        } else {
            res.status(res.status(res.statusCode).json(searchConnectedUser));
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

export default router;