// const index = require('./index');
// <<<<<<< HEAD
// const Location = require('./models/Location');
// =======
// const Promise = require('bluebird')
// >>>>>>> c0ada63347aaa6104417d9c947932a6fab5a8d5b

// //@ts-check
// var fs = require('fs'),
// request = require('request');
// const googleMapsClient = require("@google/maps").createClient({
//     key: "AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts"
// })

// var download = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//       console.log('content-type:', res.headers['content-type']);
//       console.log('content-length:', res.headers['content-length']);
//       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
//   };

// function downloadLocationPicture(locationName, locationbias, filename) {
//     console.log('HERE')
//     return new Promise(function(resolve, reject) {
//         googleMapsClient.findPlace({
//             input:locationName,
//             inputtype:"textquery",
//             fields:['photos'],
//             // location biais follows this format circle:radius@lat,lng
//             locationbias: locationbias
//         }, function(err, response){
//             if(err) {
//                 console.log('rejec 1')
//                 reject(err)
//             } else {
// <<<<<<< HEAD
//                 setTimeout(function(){
//                     if(response.json.candidates[0].photos) {
//                         googleMapsClient.placesPhoto({
//                             photoreference:response.json.candidates[0].photos[0].photo_reference,
//                             maxheight:800
//                         }, function(err, response){
//                             if(err) {
//                                 reject(err)
//                             } else {
//                                 let uri = "https://" + response.req.socket._host + response.req.path;
//                                 console.log(uri)
//                                 download(uri, filename, function(err){
//                                     if(err){
//                                         reject(err);
//                                     } else {
//                                         console.log("suppposed to resolve")
//                                         resolve({
//                                             name:filename,
//                                             location:locationbias
//                                         });
//                                     }
//                                 });
//                             }
//                         }) 
//                     } else {
//                         resolve(null);
// =======
//                 googleMapsClient.placesPhoto({
//                     photoreference:response.json.candidates[0].photos[0].photo_reference,
//                     maxheight:800
//                 }, function(err, response){
//                     if(err) {
//                         console.log('reject')
//                         reject(err)
//                     } else {
//                         let uri = "https://" + response.req.socket._host + response.req.path;
//                         download(uri, filename, function(){
//                             console.log('resolve')
//                             resolve("good");
//                         // download(uri, filename, function(err){
//                         //     if(err){
//                         //         reject(err);
//                         //     } else {
//                         //         console.log("suppposed to resolve")
//                         //         resolve({
//                         //             name:filename,
//                         //             location:locationbias
//                         //         });
//                         //     }
//                         });
// >>>>>>> af3e78ac7341a3d6587a7ad5641a711dd7442e08
//                     }
//                 }, 300)
//             }
//         })  
//     })
// }


// module.exports = downloadLocationPicture;
// //TODO: ASYNC DOESN'T WORK! We need the loop to wait until the download is done to send the processImgOnly call
// //	let latitude = 45.493613;
//     // let longitude = -73.587746;
// //         let locationBiasArray = []
// // 		for (var i = 0; i < 0.5; i+= 0.05){
// // 			for(var j = 0; j < 0.5; j+= 0.05){
// // 				console.log(`i = ${i}`)
// //                 console.log(`j = ${j}`)
// //                 locationBiasArray.push(`circle:20@${latitude},${longitude}`);
// //                 longitude += j;
// // 			}
// // 			longitude = -73.569356;
// // 			latitude += i;
// //         }
// //         console.log("==================================")
// //         console.log(locationBiasArray.length);
// //         console.log("==================================")

// <<<<<<< HEAD
//         let locationInfo = []
//         getAllPromiseData(locationBiasArray.slice(0,10), 0, 2, locationInfo)
//         .then((res)=>{
//             console.log(res);
//             console.log("for you")
//         })
//         // for (let index = 0; index < 10; index+=3) {
//         //     downloadLocationPicture("public", locationBiasArray[index], `./seed-images/${Date.now()}.jpg`)
//         //     .then((res)=>{
//         //         console.log(res)
//         //         locationInfo.push(res);
//         //         if(locationInfo.length == 3) {
//         //             console.log(locationInfo);
//         //         }
//         //     })
//         // }
//         // Promise.map(locationBiasArray, function(locationBias) {
//         //     return downloadLocationPicture("public", locationBias, `./seed-images/${Date.now()}.jpg`)
//         // }, {concurrency:3})
//         // .then((info)=>{
//         //     console.log("ingo")
//         //     console.log(info);
//         // })
//         // .catch((err)=>{
//         //     console.log("errro")
//         //     console.log(err)
//         // });
// }


// function getAllPromiseData(infoArray, index,  concurrencyMax, data) {
//     return new Promise(function(resolve, reject){
//         for (let i = index; i < index+concurrencyMax && i < infoArray.length; i++) {
//             downloadLocationPicture("public", infoArray[i], `./seed-images/${Date.now()}.jpg`)
//             .then((res)=>{
//                 console.log(res)
//                 data.push(res);
//                 if(data.length ===infoArray.length){
//                     resolve(data)
//                 }
//                 if(data.length === index+concurrencyMax) {
//                     console.log(data);
//                     setTimeout(function(){
//                         resolve(getAllPromiseData(infoArray, i+1, concurrencyMax, data))
//                     }, 15000);
//                 }
//             })
//         }
//     })
// }
// =======
// //         let locationInfo = []
// //         for (let index = 0; index < 10; index+=3) {
// //             downloadLocationPicture("public", locationBiasArray[index], `./seed-images/${Date.now()}.jpg`)
// //             .then((res)=>{
// //                 console.log(res)
// //                 locationInfo.push(res);
// //                 if(locationInfo.length == 3) {
// //                     console.log(locationInfo);
// //                 }
// //             })
// //         }
// //         Promise.map(locationBiasArray, function(locationBias) {
// //             return downloadLocationPicture("public", locationBias, `./seed-images/${Date.now()}.jpg`)
// //         }, {concurrency:3})
// //         .then((info)=>{
// //             console.log("ingo")
// //             console.log(info);
// //         })
// //         .catch((err)=>{
// //             console.log("errro")
// //             console.log(err)
// //         });
// // }


// // function getAllPromiseData(infoArray, index,  concurrencyMax, data) {
    
// //     for (let i = index; i < index+concurrencyMax && i < infoArray.length; i++) {
// //         downloadLocationPicture("public", infoArray[i], `./seed-images/${Date.now()}.jpg`)
// //         .then((res)=>{
// //             console.log(res)
// //             locationInfo.push(res);
// //             if(data.length ===infoArray.length){
// //                 // resolveThepromise with the data
// //             }
// //             if(data.length === index+concurrencyMax) {
// //                 setTimeout(function(){
// //                     resolve(getAllPromiseData(infoArray, i+1, concurrencyMax, data))
// //                 }, 500);
// //             }
// //         })
// //     }
// // }
// >>>>>>> af3e78ac7341a3d6587a7ad5641a711dd7442e08

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
