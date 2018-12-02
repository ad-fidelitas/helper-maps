let Location = require("../models/Location");
let seedLocations = require("./seeds/sample_locations.json");
function exec() {
    return Location.deleteMany({})
    .then((res)=>Promise.all(
        seedLocations.map((location)=>Location.create(location))
    ))
}

module.exports = {
    exec:exec
};