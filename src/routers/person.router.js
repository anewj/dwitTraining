import express from 'express';
import PersonController from "../controllers/person.controller";
const {
    Router,
} = express;

// Router instance
const PersonRouter = Router();

PersonRouter.get('/', async (req, res) => {
    console.log('Get request', req.headers)
    const person = await PersonController.getAllPersons()
    res.send(person)
})

PersonRouter.post('/', async (req, res) => {
    console.log('POST request', req.headers)
    const {name, phone} = req.body
    const person = await PersonController.insertPerson(req.body)
    res.send(person)
})

export default PersonRouter;