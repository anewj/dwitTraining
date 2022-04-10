const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {type: String},
    name: {
        first: {type: String, required: true},
        middle: {type: String},
        last: {type: String, required: true},
    },
    contactNumber: [{
        number: {type: Number, required: true}
    }],
    email: {type: String},
    PAN: {type: Number, unique: true},
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now}
})

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Person', schema);