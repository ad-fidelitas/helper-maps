const index = require('./index');
const Promise = require('bluebird')

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
                setTimeout(function(){
                    if(response.json.candidates[0].photos) {
                        googleMapsClient.placesPhoto({
                            photoreference:response.json.candidates[0].photos[0].photo_reference,
                            maxheight:800
                        }, function(err, response){
                            if(err) {
                                reject(err)
                            } else {
                                let uri = "https://" + response.req.socket._host + response.req.path;
                                console.log(uri)
                                download(uri, filename, function(err){
                                    if(err){
                                        reject(err);
                                    } else {
                                        console.log("suppposed to resolve")
                                        resolve({
                                            name:filename,
                                            location:locationbias
                                        });
                                    }
                                });
                            }
                        }) 
                    } else {
                        resolve(null);
                    }
                }, 300)
            }
        })  
    })
}

//TODO: ASYNC DOESN'T WORK! We need the loop to wait until the download is done to send the processImgOnly call
function callGoogle() {
		let latitude = 45.512410;
		let longitude = -73.569356;

        let locationBiasArray = []
		for (var i = 0; i < 0.5; i+= 0.05){
			for(var j = 0; j < 0.5; j+= 0.05){
				console.log(`i = ${i}`)
                console.log(`j = ${j}`)
                locationBiasArray.push(`circle:20@${latitude},${longitude}`);
                longitude += j;
			}
			longitude = -73.569356;
			latitude += i;
        }
        console.log("==================================")
        console.log(locationBiasArray.length);
        console.log("==================================")

        let locationInfo = []
        getAllPromiseData(locationBiasArray.slice(0,10), 0, 2, locationInfo)
        .then((res)=>{
            console.log(res);
            console.log("for you")
        })
        // for (let index = 0; index < 10; index+=3) {
        //     downloadLocationPicture("public", locationBiasArray[index], `./seed-images/${Date.now()}.jpg`)
        //     .then((res)=>{
        //         console.log(res)
        //         locationInfo.push(res);
        //         if(locationInfo.length == 3) {
        //             console.log(locationInfo);
        //         }
        //     })
        // }
        // Promise.map(locationBiasArray, function(locationBias) {
        //     return downloadLocationPicture("public", locationBias, `./seed-images/${Date.now()}.jpg`)
        // }, {concurrency:3})
        // .then((info)=>{
        //     console.log("ingo")
        //     console.log(info);
        // })
        // .catch((err)=>{
        //     console.log("errro")
        //     console.log(err)
        // });
}


function getAllPromiseData(infoArray, index,  concurrencyMax, data) {
    return new Promise(function(resolve, reject){
        for (let i = index; i < index+concurrencyMax && i < infoArray.length; i++) {
            downloadLocationPicture("public", infoArray[i], `./seed-images/${Date.now()}.jpg`)
            .then((res)=>{
                console.log(res)
                data.push(res);
                if(data.length ===infoArray.length){
                    resolve(data)
                }
                if(data.length === index+concurrencyMax) {
                    console.log(data);
                    setTimeout(function(){
                        resolve(getAllPromiseData(infoArray, i+1, concurrencyMax, data))
                    }, 15000);
                }
            })
        }
    })
}

callGoogle()
