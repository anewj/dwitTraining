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

    console.log('person  ++++++++ ', person)
    const promise = new Promise((resolve, reject) => {
        person.save().then(record => {
            resolve(record)
        }).catch(err => {
            reject(err);
        });
    });
    return await promise;
}

function getAll() {
    return Person.find();
}

async function getById(id) {
    return Person.findById(id);
}

