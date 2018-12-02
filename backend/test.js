/**
 * @function ratingToColorGenerator
 * @description Normalizes the data set and converts the normalized rating into a color
 * @param {Number} max 
 * @returns {Function} 
 */
function ratingToColorGenerator(max){
    return (LocationSet)=>{
        return LocationSet.map((location)=>  {
            let normalizedRating = location.accessibilityRating/max
            let color = convertRatingToColor(normalizedRating);
            return {
                coordinates:location.coordinates,
                accessibilityColor: color
            }
        })
    }
}

/**
 * @function convertRatingToColor
 * @description Converts a rating (number found between -1 and 1) to a hex format color
 * -1 color will give a color closer to red
 * 1 color will give a color closer to green
 * @param {Number} rating 
 */
function convertRatingToColor(rating) {
    // RGB, there for #RRGGBB in hex
    // 1 should have #00FF00 as an ouput
    // -1 should have #FF0000 as an output
    let start = 0xffff00;
    // minus one, more red, take away the green
    let substract = 0xff-Math.floor(Math.abs(rating * 0xff));
    let formattedSubstract = rating<0 ? (substract << 8) |0xff0000 : (substract<<16) | 0x00ff00;

    var color = (start & formattedSubstract).toString(16);
    let colorLength = color.length;
    for (let index = 0; index < 6 - colorLength; index++) {
        color = "0" + color;
    }
    return "0x" + color;
}

let sampleLocations = require("./seeding/seeds/sample_locations.json");
const allAccessibilityRatings = sampleLocations.map((locationDoc)=>locationDoc.accessibilityRating);
const absoluteMinimum = Math.abs(Math.min(...allAccessibilityRatings));
console.log(absoluteMinimum)
const ratingToColor = ratingToColorGenerator(Math.max(...allAccessibilityRatings, absoluteMinimum));
let newLocations = ratingToColor(sampleLocations);
console.log(newLocations);
