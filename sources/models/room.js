import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    creationDate: {
        type: Date
    },
    creator: {
        required: true,
        type: String
    },
    isConnected: {
        type: Boolean
    },
    lastUpdated: {
        type: Date
    },
    relatedUsers: {
        required: true,
        type: [String]
    },
    status: {
        required: true,
        type: Boolean
    }
});

export default mongoose.model('room', roomSchema);