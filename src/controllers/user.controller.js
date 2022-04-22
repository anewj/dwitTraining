const userService = require('../services/user.service');

const getAllUsers = async (query) => {
    return await userService.getAll(query)
}

async function insertUser(body) {
    console.log('insert person')
    const {username, password} = body
    if (!username || !password)
        return ({error: "invalid data"})
    // ^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$
    try {
        return await userService.create(body)
    } catch (e) {
        console.log('Error catched')
        // return await personService.create(body)
        throw Error('Duplicate Value')
    }
}

async function signin(body, res) {
    console.log('signin person', body)
    try {
        await userService.signin(body, res)
    } catch (e) {
        console.log('Error catched')
        // return await personService.create(body)
        throw Error('Duplicate Value')
    }
}

async function getUserById(id) {
    return await userService.getById(id)
}

async function deleteUser(id) {
    return await userService.deleteUser(id)
}

const UserController = {
    getAllUsers,
    insertUser,
    signin,
    getUserById,
    deleteUser
}

export default UserController