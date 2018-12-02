let fs = require("fs");

/** montreal box */
min= [45.497500, -73.575297]
max = [45.517624, -73.560320]

function randomWithinInterval(min, max) {
    let span = max-min;
    return ()=>{
        return min + Math.random()*span;
    }
}

let ratingGenerator = randomWithinInterval(-200, 255);
let xGenerator = randomWithinInterval(45.497500, 45.517624)
let yGenerator = randomWithinInterval(-73.575297, -73.560320)

function generateRandomLocations(quantity) {
    let randomLocations = []
    for (let index = 0; index < quantity; index++) {
        randomLocations.push({
            coordinates: [xGenerator(), yGenerator()],
            accessibilityRating : ratingGenerator()
        })
    }
    return randomLocations;
}
let seed = generateRandomLocations(10)
fs.writeFileSync("./seeding/seeds/yale_stadium.json", JSON.stringify(seed));