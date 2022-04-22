const db = require('../utils/db');
const bcrypt = require("bcrypt");
const User = db.User;

module.exports = {
    create,
    getAll,
    getById,
    deleteUser,
    signin
};

// async await
async function create(userParams) {
    const bcrypt = require('bcrypt');
    const saltRounds = Number(process.env.SALT_ROUND);
    bcrypt.hash(userParams.password, saltRounds, async function (err, hash) {
        console.log(saltRounds)
        console.log('hash', hash)
        const user = new User({'username': userParams.username, 'password': hash})
        return await user.save()
    });
}

async function signin(body, res) {
    const {username, password} = body
    const user = await User.findOne({username})
    const msg = {message: 'username or password invalid'};
    if (!user || !password)
        return res.status(400).send(msg)
    bcrypt.compare(password, user.password, function (err, result) {
        if (result)
            return res.send({
                "success": result
            })
        else
            return res.status(400).send(msg)

    });

    // return User.find({"name.first":name});
}

async function getAll(query) {
    const {name, PAN} = query
    return User.find({"name.first": name});
}

async function getById(id) {
    // console.log(await  Person.findById(id))
    return User.findById(id);
}

async function deleteUser(id) {
    // console.log(await  Person.findById(id))
    return User.findOneAndDelete(id);
}
