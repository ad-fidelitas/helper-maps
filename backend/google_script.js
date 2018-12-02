const index = require('./index');
const Location = require('./models/Location');

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
    console.log('HERE')
    return new Promise(function(resolve, reject) {
        googleMapsClient.findPlace({
            input:locationName,
            inputtype:"textquery",
            fields:['photos'],
            // location biais follows this format circle:radius@lat,lng
            locationbias: locationbias
        }, function(err, response){
            if(err) {
                console.log('rejec 1')
                reject(err)
            } else {
                googleMapsClient.placesPhoto({
                    photoreference:response.json.candidates[0].photos[0].photo_reference,
                    maxheight:800
                }, function(err, response){
                    if(err) {
                        console.log('reject')
                        reject(err)
                    } else {
                        let uri = "https://" + response.req.socket._host + response.req.path;
                        download(uri, filename, function(){
                            console.log('resolve')
                            resolve("good");
                        });
                    }
                })
            }
        })  
    });
}


module.exports = downloadLocationPicture;
//TODO: ASYNC DOESN'T WORK! We need the loop to wait until the download is done to send the processImgOnly call
//	let latitude = 45.493613;
    // let longitude = -73.587746;

// 		for (var i = 0; i < 0.5; i+= 0.05){
                //console.log(`i = ${i}`)
//for( var i = 0; i < 10; i++) {
    // var filename = Date.now()
    // longitude += 0.0068362*6
    // latitude += 0.003007*6
    // downloadLocationPicture("quebec", `circle:20@${latitude},${longitude}`, `./images/file.jpg`)
    // .then( (res) => {
    //     console.log(res)
    //     index.processImgOnly(longitude, latitude);
    // })
//}
	//		latitude += i;
	//  	}
