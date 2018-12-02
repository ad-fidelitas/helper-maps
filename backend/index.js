//@ts-check
var express = require("express");
var router = express.Router();
const { spawn } = require('child_process');
const Location = require("./models/Location");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

global.DataView = global.DataView || require('jdataview');
global.DOMParser = global.DOMParser || require('xmldom').DOMParser;

const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;


const filePath = './images/file.jpg'

function getExifData () {
		return new Promise((resolve, reject) => {
				fs.readFile(filePath, function (error, data) {
					if (error) {
						console.error('Error reading file.');
						process.exit(1);
					}

					try {
						const tags = ExifReader.load(data.buffer);

						// The MakerNote tag can be really large. Remove it to lower memory
						// usage if you're parsing a lot of files and saving the tags.
						delete tags['MakerNote'];
							if(tags.GPSLatitude != undefined && tags.GPSLatitudeRef.value != undefined){
								console.log('GETTING COORDINATES')
								results = []
								results.push(tags.GPSLatitudeRef.value)
								results.push(tags.GPSLatitude.description)
								results.push(tags.GPSLongitudeRef.value)
								results.push(tags.GPSLongitude.description)		
								delete tags
								//console.log(results)
								resolve(results)
							} else {
								reject('NO COORDINATES')
							}
						
					} catch (error) {
						console.log('ERROR')
						console.log(error)
						

						console.error(error);
						process.exit(1);
					}
				});
		})
		
}

function listTags(tags) {
    for (const name in tags) {
        console.log(`${name}: ${tags[name].description}`);
    }
}


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
        const allAccessibilityRatings = locationDocArray.map((locationDoc)=>locationDoc.accessibilityRating);
        const absoluteMinimum = Math.abs(Math.min(...allAccessibilityRatings));
        const ratingToColor = ratingToColorGenerator(Math.max(...allAccessibilityRatings, absoluteMinimum));
        const coloredLocations = ratingToColor(locationDocArray);
        res.json(coloredLocations);
    })
    .catch((err)=>{
        res.status(422).json(err);
    })
})

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
    return "#" + color;
}


// img upload storage engine
var storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});



// img init upload
var upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

function checkFileType (file, cb) {
    // Allowed extensions
    var filetypes = /jpeg|jpg|png/;
    // check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    var mimetype = filetypes.test(file.mimetype);
    if (extname && extname) {
        return cb(null, true);
    }
    cb('Error: Images only');
}

router.post("/upload", function(req,res){
    upload(req, res, (err) => {
        if (err) {
			console.log(err)
            res.status(422).send('ERROR 1 in uploading file');
        } else {
            if(req.file == undefined) {
				return res.status(422).send('ERROR 2 in uploading file');
            }

            var filename = req.file.filename;
			getExifData()
				.then((coords) => {
					return new Promise(function(fulfill, reject) {
						const pyprog = spawn('python3',["./image-processing.py", 'file.jpg']);
						pyprog.stdout.on('data', function(data) {
							console.log('PYTHON SCRIPT WORKED')
							coords.push(Number(data.toString()))
							fulfill(coords);
						});
						pyprog.stderr.on('data', (data) => {
							console.log('PYTHON SCRIPT BROKE')
							reject(data);
						});
					})
				})
			.then(function(fromRunpy) {
				let accessTotal = fromRunpy[4]
				//console.log(fromRunpy)
				console.log("Access Total = " + accessTotal)
				// West neg
				// North pos
				var latitude = fromRunpy[1]
				var longitude = fromRunpy[3]
					if (fromRunpy[0][0] == 'S'){
							latitude *= -1
					}
					if (fromRunpy[2][0] == 'W'){
							longitude *= -1
					}
				console.log(`Coordinates: latitude = ${latitude} and longitude = ${longitude}`)
				Location.create({
					coordinates: [latitude, longitude],
					//coordinates: [coords[1], coords[3]],
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

        }
});
});

module.exports = router;


// router.post("/upload/", (req,res)=>{
    //     // send image to database by calling the Python part of the code
    //     /** @type {Coordinates} */
    //     let coordinates = req.body;
    //     console.log(req.body);
    //     console.log(req.params.img_name);
    
    //     new Promise(function(fulfill, reject) {
    //         const pyprog = spawn('python3',["../image-processing.py", req.params.img_name]);
    //         pyprog.stdout.on('data', function(data) {
    // 			console.log('PYTHON SCRIPT WORKED')
    //             fulfill(data);
    //         });
    //         pyprog.stderr.on('data', (data) => {
    // 			console.log('PYTHON SCRIPT BROKE')
    //             reject(data);
    //         });
    //     })
    //     .then(function(fromRunpy) {
    //         let accessTotal = Number(fromRunpy.toString());
    // 		console.log("Access Total = " + accessTotal)
    //         Location.create({
    //             coordinates: [coordinates[0], coordinates[1]],
    //             accessibilityRating: accessTotal
    //         })
    //         .then((locationDoc)=>{
    //             res.json(locationDoc);
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log("error has not been properly analysed by the database");
    //         res.status(422).json(err);
    //     });
    // })
    
