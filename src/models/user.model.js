const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now}
})

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);