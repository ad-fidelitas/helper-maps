var express = require("express");
var router = express.Router();

/**
 * When receiving data from python script
 * we should be receiving a value between -1 to 1,
 * 
 * we need to be converting that value to a rgb value between red and green
 */
router.get("/", (req,res)=>{

})

router.post("/", (req,res)=>{

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
    let start
}

