const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
    name: String,
    pupulation: Number,
    flag: String,
    capital: String,
    region: String
})

module.exports = mongoose.model("Country", countrySchema);