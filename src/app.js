import express from 'express';

const bodyParser = require("express");
const app = express()
const port = 3000

// Load .env environment variables
require('dotenv').config()

// Middleware function
const log = (req, res, next) => {
    console.log('<<<<<<<<<<<LOGGER>>>>>>>>>>')
    console.log(req.method, req.url)
    console.log('<<<<<<<<<<<LOGGER>>>>>>>>>>')
    next()
}

// Global Middleware
app.use(log)

app.use(bodyParser.json());
require('./routers')(app)


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${process.env.PORT || port}`)
})


