import PersonRouter from "./person.router";

module.exports = async (app) => {
    // person
    app.use('/person', PersonRouter);
    // Test route
    app.get('/', (req, res) => {
        console.log('GET request')
        res.send({
            message: 'Hello world'
        })
    })
    // NOT FOUND
    app.get('*', function (req, res) {
        res.status(404).send({
            success: false,
            message: 'Not found'
        })
    });
};
