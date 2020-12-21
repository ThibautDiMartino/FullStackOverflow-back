module.exports = {
    down (db) {
        // Remove the password field in every users in the collection
        return db.collection('users').updateMany({}, {
            $unset: {
                password: ''
            }
        });
    },
    up (db) {

        /*
         * Add the password field in every users in the collection
         * let ids = [];
         * return db.collection('users').find().forEach(function (user) {
         * ids.push(user._id);
         * }).then(() => {
         * ids.forEach(async id => {
         * console.log(id);
         * const us = await user.findById(id);
         * console.log(us);
         */

        /*
         * (id, {
         * $set: {
         * "password": Math.floor((Math.random() * 999999999999999) + 134564345674554).toString(16)
         * }
         * })
         * })
         * });
         * if (user.password === undefined) {
         */
        return db.collection('users').updateMany({}, {
            $set: {
                password: ''
            }
        });
    }
};