const db = require('../utils/db');
const Person = db.Person;

module.exports = {
    create,
    getAll,
    getById,
};
// async await
async function create(personParams) {
    // save Person
    const person = new Person(personParams);
    return await person.save();
}

async function getAll(query) {
    const {name, PAN} = query
    return Person.find({name});
}

async function getById(id) {
    // console.log(await  Person.findById(id))
    return Person.findById(id);
}

