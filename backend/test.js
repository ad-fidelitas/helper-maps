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
    for (index = 0; index < 6 - colorLength; index++) {
        color = "0" + color;
    }
    return "0x" + color;
}


