let mongoose = require("mongoose");

let locationSchema = mongoose.Schema({
    coordinates: [Number],
    accessibilityRating: Number
})

let Location = new mongoose.Model("location", locationSchema);

module.exports = Location;