import express from 'express';
import PersonController from "../controllers/person.controller";
import {log} from "nodemon/lib/utils";

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
// Test route
PersonRouter.get('/test', auth, role, (req, res) => {
    console.log('GET request: person test')
    res.send({
        message: 'Hello world'
    })
})

PersonRouter.get('/', role, auth, async (req, res) => {
    console.log('Get request /////////', req.headers)
    let startTime, endTime;

    function start() {
        startTime = new Date();
    };

    function end() {
        endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        // timeDiff /= 1000;

        // get seconds
        // var seconds = Math.round(timeDiff);
        console.log(timeDiff + " seconds");
    }

    // await
    start()
    const person1 = PersonController.getAllPersons()
    const person2 = PersonController.getAllPersons()
    const person3 = PersonController.getAllPersons()
    const person4 = PersonController.getAllPersons()
    const person5 = PersonController.getAllPersons()
    end()

    await Promise.all([person1, person2, person3, person4, person5,]).then(([p1, p2,]) => {
        console.log('person1', p1)
        console.log('person2', p2)
        res.send({data: {p1, p2}})
    })

//    Promise
//     let person = 'asd'
//     // Promise
//     PersonController.getAllPersons()
//         .then(vals => {
//             console.log('vals', vals)
//             person = vals
//             res.send({data: person})
//         })

})

PersonRouter.post('/', async (req, res) => {
    console.log('POST request', req.headers)
    const person = await PersonController.insertPerson(req.body)
    // res.send(person)
})

export default PersonRouter;