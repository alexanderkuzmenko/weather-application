const mongoose = require("mongoose")
const citySchema = new mongoose.Schema({
    name: String,
    name_ua: String
})

const City = mongoose.model('City', citySchema)
module.exports.City = City