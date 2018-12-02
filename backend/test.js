

let sampleLocations = require("./seeding/seeds/sample_locations.json");
const allAccessibilityRatings = sampleLocations.map((locationDoc)=>locationDoc.accessibilityRating);
const absoluteMinimum = Math.abs(Math.min(...allAccessibilityRatings));
console.log(absoluteMinimum)
const ratingToColor = ratingToColorGenerator(Math.max(...allAccessibilityRatings, absoluteMinimum));
let newLocations = ratingToColor(sampleLocations);
console.log(newLocations);
