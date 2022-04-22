import express from 'express';
import PersonController from "../controllers/person.controller";
import UserController from "../controllers/user.controller";

const {
    Router,
} = express;

// Router instance
const UserRouter = Router();

// Get by ID route
UserRouter.get('/:id', async (req, res) => {
    console.log('GET request: person by ID')
    const {id} = req.params
    const value = await PersonController.getPersonById(id)
    res.send({
        data: value
    })
})

UserRouter.get('/', async (req, res) => {
    console.log('Get request /////////', req.headers)
    const queries = req.query
    console.log('queries', queries)
    const data = await PersonController.getAllPersons(queries)
    res.send({data})
})

UserRouter.post('/', async (req, res) => {
    console.log('POST USER request', req.headers)
    try {
        console.log('USER', req.body)
        await UserController.insertUser(req.body)
    } catch (e) {
        res.send({reason: e.message})
    }
})

// signin
UserRouter.post('/signin', async (req, res) => {
    console.log('POST signin USER request', req.headers)
    try {
        await UserController.signin(req.body, res)
    } catch (e) {
        res.send({reason: e.message})
    }
})

UserRouter.delete('/:id', async (req, res) => {
    console.log('DELETE request', req.headers)
    try {
        const person = await PersonController.deletePerson(req.params.id)
        res.send(person)
    } catch (e) {
        res.send({reason: e.message})
    }
})

export default UserRouter;