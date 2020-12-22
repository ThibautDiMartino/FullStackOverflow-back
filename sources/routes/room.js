import Room from '../models/room.js';
import User from '../models/user.js';
import express from 'express';
const router = express.Router();

// Retrieve all the created rooms
router.get('/', async (req, res) => {
    try {
        const users = await Room.find();

        res.status(res.statusCode).json(users);
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Create a game room
router.post('/create', async (req, res) => {
    const room = new Room({
        creationDate: new Date(),
        creator: req.body.creator,
        isConnected: true,
        relatedUsers: [req.body.creator],
        status: true
    });

    try {
        const searchUser = await User.findById(req.body.creator);

        if (searchUser !== {} && searchUser.room === null) {
            // Updating the user after the room creation
            const createdRoom = await room.save(),
                updateUser = await User.findByIdAndUpdate(
                    req.body.creator,
                    { room: createdRoom._id }
                );

            res.status(res.statusCode).json({ createdRoom, updateUser });
        } else {
            res.status(409).json('User has an active room');
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Connect a user to an existing room
router.post('/connect', async (req, res) => {
    try {
        // Search if the room exists in the database
        const searchRoom = await Room.find({ _id: { $in: req.body.roomId } }),
            searchUser = await User.find({ _id: { $in: req.body.userId } });

        if (searchRoom.length > 0 && searchRoom[0].relatedUsers.length < 2 &&
            searchUser[0].room === null) {
            // Updating room and user due to connection
            const updateRoom = await Room.findByIdAndUpdate(searchRoom[0]._id, { relatedUsers: [
                    searchRoom[0].relatedUsers[0],
                    req.body.userId
                ] }),
                updateUser = await User.findByIdAndUpdate(
                    searchUser[0]._id,
                    { room: req.body.roomId }
                );

            res.status(res.statusCode).json({ updateRoom, updateUser });
        } else {
            if (searchRoom[0].relatedUsers.length === 2) {
                res.status(200).send('Room is full');
            }
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Disconnect a user from an existing room
router.post('/disconnect', async (req, res) => {
    try {
        // Search if the room exists in the database
        const searchRoom = await Room.find({ _id: { $in: req.body.roomId } }),
            searchUser = await User.find({ _id: { $in: req.body.userId } });
        let users = [searchRoom[0].relatedUsers[0]];

        if (searchRoom.length > 0 && searchRoom[0].relatedUsers.length > 0 &&
            searchUser[0].room !== null) {
            if (req.body.userId === searchRoom[0].relatedUsers[0]) {
                users = [searchRoom[0].relatedUsers[1]]
            }
            // Updating room and user due to disconnection
            const updateRoom = await Room.findByIdAndUpdate(
                    searchRoom[0]._id,
                    { relatedUsers: users }
                ),
                updateUser = await User.findByIdAndUpdate(
                    searchUser[0]._id,
                    { room: null }
                );

            res.status(res.statusCode).json({ updateRoom, updateUser });
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

// Delete a room by its id
router.delete('/', async (req, res) => {
    try {
        const findRoom = await Room.find({ _id: req.body._id });

        if (findRoom.length > 0) {
            if (findRoom[0].relatedUsers.length > 0) {
                // Disconnecting all the connected users
                findRoom[0].relatedUsers.forEach(async (element) => {
                    await User.findByIdAndUpdate(
                        element,
                        { room: null }
                    );
                });
            }
            const deleteRoom = await Room.deleteOne({ _id: req.body._id });

            res.status(res.statusCode).json(deleteRoom);
        } else {
            res.status(404).json('Room doesn\'t exist');
        }
    } catch (err) {
        res.status(res.statusCode).json(err);
    }
});

export default router;