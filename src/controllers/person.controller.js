const personService = require('../services/person.service');

function getAllPersons() {
    return personService.getAll()
}

function insertPerson(body) {
    return personService.create(body)
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