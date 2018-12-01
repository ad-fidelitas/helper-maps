let mongoose = require("mongoose");

let locationSchema = new mongoose.Schema({
    coordinates: [Number],
    accessibilityRating: Number
})

let Location = mongoose.model("Location", locationSchema);

module.exports = Location;