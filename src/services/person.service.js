const db = require('../utils/db');
const Person = db.Person;

module.exports = {
    create,
    getAll,
    getById,
};

async function create(personParams) {
    // save Person
    const person = new Person(personParams);
    return await person.save();
}

function getAll() {
    return Person.find();
}

async function getById(id) {
    return Person.findById(id);
}

