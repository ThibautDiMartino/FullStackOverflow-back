module.exports = {
    down (db) {
        // Remove the isConnected field in every users in the collection
        return db.collection('users').updateMany({}, {
            $unset: {
                isMatching: false
            }
        });
    },
    up (db) {
        // Add the isConnected field in every users in the collection
        return db.collection('users').updateMany({}, {
            $set: {
                isMatching: false
            }
        });
    }
};