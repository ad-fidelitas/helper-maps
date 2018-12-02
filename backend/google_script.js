//@ts-check
const googleMapsClient = require("@google/maps").createClient({
    key: "AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts"
})



googleMapsClient.findPlace({
    input:"Montreal",
    inputtype:"textquery",
    fields:['photos'],
    // location biais follows this format circle:radius@lat,lng
    locationbias: "circle:20@45.5016889,-73.567256"
}, function(err, response){
    if(err) {
        console.log(err)
    } else {
        for (const photo of response.json.candidates[0].photos) {
            console.log(photo.photo_reference)
        }
    }
})  

googleMapsClient.placesPhoto({
    photoreference:"CmRaAAAASEqwXqOh2kQG_CJFnVcAx3bjy7FxkJBptitH_YTAnDhzrc1KPCogljaQ7mzZuUteOFMQGgQTupRtemQyDBQXb1H7ZzTpZGAkmOGdiAyuIhXUlr5p7je2-zdiAsYSRdhLEhCt5t7DLe99hz0pyEJV9cuuGhSclbu6HeoxQn-HjcJPt6WgQVJfiA",
    maxheight:500
}, function(err, response){
    if(err) {
        console.log(err)
    } else {
        console.log("ok")
        console.log(response.req.socket._host)
        console.log(response.req.path)
        console.log("https://" + response.req.socket._host + response.req.path)
    }
})


var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://lh3.googleusercontent.com/p/AF1QipMXsEevKRE-K8X_7RSr30qJ-8blSoS1ldDfi0oH=s1600-h500', 'google.jpg', function(){
  console.log('done');
});
