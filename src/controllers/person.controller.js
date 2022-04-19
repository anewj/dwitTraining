const personService = require('../services/person.service');

const getAllPersons = async (query) => {
    return await personService.getAll(query)
}

async function insertPerson(body) {
    console.log('insert person')
    const {name, phone} = body
    console.log(name)
    if (!name || !name.first || !name.last)
        return ({error: "no Name"})
    // if (!phone)
    //     return({error: "no Number"})
    // if (typeof name !== 'string')
    //     return({error: "name must be string"})
    try {
        return await personService.create(body)
    } catch (e) {
        console.log('Error catched')
        // return await personService.create(body)
        throw Error('Duplicate Value')
    }
}

async function getPersonById(id) {
    return await personService.getById(id)
}

const PersonController = {
    getAllPersons,
    insertPerson,
    getPersonById,
}

export default PersonController