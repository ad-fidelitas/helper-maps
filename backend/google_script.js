const index = require('./index');

//@ts-check
var fs = require('fs'),
request = require('request');
const googleMapsClient = require("@google/maps").createClient({
    key: "AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts"
})

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
	   
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

function downloadLocationPicture(locationName, locationbias, filename) {
    return new Promise(function(resolve, reject) {
        googleMapsClient.findPlace({
            input:locationName,
            inputtype:"textquery",
            fields:['photos'],
            // location biais follows this format circle:radius@lat,lng
            locationbias: locationbias
        }, function(err, response){
            if(err) {
                reject(err)
            } else {
                googleMapsClient.placesPhoto({
                    photoreference:response.json.candidates[0].photos[0].photo_reference,
                    maxheight:800
                }, function(err, response){
                    if(err) {
                        reject(err)
                    } else {
                        let uri = "https://" + response.req.socket._host + response.req.path;
                        download(uri, filename, function(){
                            resolve("good");
                        });
                    }
                })
            }
        })  
    });
}

//TODO: ASYNC DOESN'T WORK! We need the loop to wait until the download is done to send the processImgOnly call
function callGoogle() {
		let latitude = 45.512410;
		let longitude = -73.569356;

		for (var i = 0; i < 0.5; i+= 0.05){
			for(var j = 0; j < 0.5; j+= 0.05){
				console.log(`i = ${i}`)
				console.log(`j = ${j}`)
				downloadLocationPicture("public", `circle:20@${latitude},${longitude}`, "./images/google.jpg")
				.then( (result) => {
					index.processImgOnly(latitude, longitude)
					longitude += j;
				}) 
				
			}
			longitude = -73.569356;
			latitude += i;
		}
}

callGoogle()
