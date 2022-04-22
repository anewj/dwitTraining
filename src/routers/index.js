import PersonRouter from "./person.router";
import UserRouter from "./user.router";

module.exports = async (app) => {
    // person
    app.use('/person', PersonRouter);
    app.use('/user', UserRouter);

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
            message: 'Not found. blah '
        })
    });
};
