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
    const validJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY0OTU4ODAwMSwiZXhwIjoxNjQ5Njc0NDAxfQ.UlGiBpgfySCfrGeVnS6crd57Q4POEfI6ac8oiQmh-Hg'
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
// Test route
PersonRouter.get('/test', auth, role, (req, res) => {
    console.log('GET request: person test')
    res.send({
        message: 'Hello world'
    })
})

PersonRouter.get('/', role, auth, async (req, res) => {
    console.log('Get request', req.headers)
    const person = await PersonController.getAllPersons()
    res.send({data: person})
})

PersonRouter.post('/', async (req, res) => {
    console.log('POST request', req.headers)
    const {name, phone} = req.body
    const person = await PersonController.insertPerson(req.body)
    res.send(person)
})

export default PersonRouter;