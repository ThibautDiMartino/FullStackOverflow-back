const mongoose = require('mongoose');
const userSchema = mongoose.Schema({ // eslint-disable-line
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
    isConnected: {
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
    }
})

module.exports = mongoose.model('user', userSchema);