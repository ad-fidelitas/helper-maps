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
                    maxheight:500
                }, function(err, response){
                    if(err) {
                        reject(err)
                    } else {
                        let uri = "https://" + response.req.socket._host + response.req.path;
                        download('https://lh3.googleusercontent.com/p/AF1QipMXsEevKRE-K8X_7RSr30qJ-8blSoS1ldDfi0oH=s1600-h500', filename, function(){
                            resolve("good");
                        });
                    }
                })
            }
        })  
    });
}

downloadLocationPicture("Montreal", "circle:20@45.5016889,-73.567256", "google.jpg");

