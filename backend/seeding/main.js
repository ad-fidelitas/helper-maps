let Location = require("../models/Location");
let seedLocations = require("./seeds/montreal_full_data.json");

function exec() {
    return Location.deleteMany({})
    .then((res)=>Promise.all(
        seedLocations.map((location)=>Location.create(location))
    ))

    // return Promise.all(seedLocations.map((location)=>Location.create(location)))
}

module.exports = {
    exec:exec
};