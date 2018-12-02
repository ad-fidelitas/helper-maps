let Location = require("../models/Location");
let fs = require("fs");

function exec(seedName) {
    return Location.find({}).exec()
    .then((locationDocs)=>{
        console.log("ok");
        console.log(locationDocs)
        cleanLocations = locationDocs.map((locationDoc)=>{
            return {
                coordinates:[locationDoc.coordinates[0], locationDoc.coordinates[1]],
                accessibilityRating : locationDoc.accessibilityRating
            }
        })
        console.log(cleanLocations);
        try {
            fs.writeFileSync(seedName, JSON.stringify(cleanLocations))
            console.log("success");
        } catch(err) {
            console.log(err);
            console.log("failure");
        }

})}

module.exports ={
    exec:exec
}
