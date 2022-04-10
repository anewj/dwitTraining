import express from 'express';
const bodyParser = require("express");
const app = express()
const port = 3000
require('dotenv').config()

app.use(bodyParser.json());

require('./routers')(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


