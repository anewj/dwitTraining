import express from 'express';
import PersonController from "../controllers/person.controller";

const {
    Router,
} = express;

// Router instance
const PersonRouter = Router();
// auth
const auth = (req, res, next) => {
    console.log('METHOD', req.method)
    console.log('URL', req.url)
    console.log('QUERY', req.query)
    const {name, number} = req.query
    console.log('NAME', name)
    console.log('Number', number)
    const validJWT = 'password'
    const {jwt} = req.headers
    console.log('AUTH1', jwt)
    if (jwt !== validJWT)
        return res.send({
            user: 'Invalid'
        })

    next();
}

//role RBAC
const role = (req, res, next) => {
    console.log('Role')
    next()
}

// Get by ID route
PersonRouter.get('/:id', async (req, res) => {
    console.log('GET request: person by ID')
    const {id} = req.params
    const value = await PersonController.getPersonById(id)
    res.send({
        data: value
    })
})

// Test route
PersonRouter.get('/test', (req, res) => {
    console.log('GET request: person test')
    res.send({
        message: 'Hello world'
    })
})

PersonRouter.get('/', auth, role, async (req, res) => {
    console.log('Get request /////////', req.headers)
    const queries = req.query
    console.log('queries', queries)
    const data = await PersonController.getAllPersons(queries)
    res.send({data})
})

PersonRouter.post('/', auth, async (req, res) => {
    console.log('POST request', req.headers)
    try {
        const person = await PersonController.insertPerson(req.body)
        res.send(person)
    } catch (e) {
        res.send({reason: e.message})
    }
})

PersonRouter.delete('/:id', auth, async (req, res) => {
    console.log('DELETE request', req.headers)
    try {
        const person = await PersonController.deletePerson(req.params.id)
        res.send(person)
    } catch (e) {
        res.send({reason: e.message})
    }
})

export default PersonRouter;