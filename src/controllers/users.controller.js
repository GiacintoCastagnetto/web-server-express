const {response, request} = require("express");

const getUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: "GET Users"
    })
}

const createUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "POST Users"
    })
}

const updateUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "PUT Users"
    })
}

const deleteUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "DELETE Users"
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}