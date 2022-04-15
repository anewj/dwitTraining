import express from 'express';

const bodyParser = require("express");
const app = express()
const port = 3000
require('dotenv').config()

const log = (req, res, next) => {
    console.log('<<<<<<<<<<<LOGGER>>>>>>>>>>')
    console.log(req.method, req.url)
    console.log('<<<<<<<<<<<LOGGER>>>>>>>>>>')
    next()
}
app.use(log)

app.use(bodyParser.json());
require('./routers')(app)


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${process.env.PORT || port}`)
})


