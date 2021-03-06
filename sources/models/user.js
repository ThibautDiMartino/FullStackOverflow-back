import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    creationDate: {
        type: Date
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    firstName: {
        required: true,
        type: String
    },
    friends: {
        type: [String]
    },
    gender: {
        required: true,
        type: String
    },
    isConnected: {
        type: Boolean
    },
    isMatching: {
        type: Boolean
    },
    lastName: {
        required: true,
        type: String
    },
    lastUpdated: {
        type: Date
    },
    password: {
        required: true,
        type: String
    },
    profilePicture: {
        type: String
    },
    room: {
        type: String
    }
});

export default mongoose.model('user', userSchema);