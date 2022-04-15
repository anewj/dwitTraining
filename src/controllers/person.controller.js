const personService = require('../services/person.service');

const getAllPersons = () => {
    return personService.getAll()
}

function insertPerson(body) {
    console.log('insert person')
    const {name, phone} = body
    if (!name)
        return({error: "no Name"})
    // if (!phone)
    //     return({error: "no Number"})
    // if (typeof name !== 'string')
    //     return({error: "name must be string"})

    personService.create(body).then(r => {
        console.log(r)})
}

function getPersonById(req, res, next) {
    personService.getById(req.params.id)
        .then(person => person ? res.json(person) : res.sendStatus(404))
        .catch(err => next(err));
}

const PersonController = {
    getAllPersons,
    insertPerson,
    getPersonById,
}

export default PersonController