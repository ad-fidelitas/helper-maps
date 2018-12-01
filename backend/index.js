//@ts-check
var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');
const Location = require("./models/Location");

/**
 * @typedef {Array<Number>} Coordinates
 */

/**
 * When receiving data from python script
 * we should be receiving a value between -1 to 1,
 * 
 * we need to be converting that value to a rgb value between red and green
 */
router.get("/", (req,res)=>{
    Location.find({}).exec()
    .then((locationDocArray)=>{
        res.send(locationDocArray)
    })
    .catch((err)=>{
        res.status(422).json(err);
    })
})

router.post("/:img_name", (req,res)=>{
    // send image to database by calling the Python part of the code
    /** @type {Coordinates} */
    let coordinates = req.body;
    console.log(req.body);
    console.log(req.params.img_name);

    new Promise(function(fulfill, reject) {
        const pyprog = spawn('python3',["../image-processing.py", req.params.img_name]);
        pyprog.stdout.on('data', function(data) {
			console.log('PYTHON SCRIPT WORKED')
            fulfill(data);
        });
        pyprog.stderr.on('data', (data) => {
			console.log('PYTHON SCRIPT BROKE')
            reject(data);
        });
    })
    .then(function(fromRunpy) {
        let accessTotal = Number(fromRunpy.toString());
		console.log("Access Total = " + accessTotal)
        Location.create({
            coordinates: [coordinates[0], coordinates[1]],
            accessibilityRating: accessTotal
        })
        .then((locationDoc)=>{
            res.json(locationDoc);
        })
    })
    .catch((err)=>{
        console.log("error has not been properly analysed by the database");
        res.status(422).json(err);
    });
})

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

module.exports = router;

