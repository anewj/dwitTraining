const mongoose = require('mongoose');

const connectWithRetry = () => {
    console.log('MongoDB connection with retry', process.env.connectionString);
    // mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.connectionString).then(() => {
        console.log('MongoDB is connected')
    }).catch(err => {
        console.log('MongoDB connection unsuccessful.', err.message);
    })
};

connectWithRetry();

mongoose.Promise = global.Promise;

module.exports = {
    mongoose: mongoose,
    Person: require('../models/person.model'),
    User: require('../models/user.model'),
};
