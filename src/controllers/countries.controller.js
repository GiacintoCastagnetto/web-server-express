const {response, request} = require("express");

const getCountries = (req = request, res = response) => {
    res.status(200).json({
        msg: "GET Countries"
    })
}

const createCountry = (req = request, res = response) => {
    res.status(200).json({
        msg: "POST Countries"
    })
}

const updateCountry = (req = request, res = response) => {
    res.status(200).json({
        msg: "PUT Countries"
    })
}

const deleteCountry = (req = request, res = response) => {
    res.status(200).json({
        msg: "DELETE Countries"
    })
}

module.exports = {
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry
}