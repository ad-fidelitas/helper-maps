const config = {
    seed:false,
    download: false
}
const express  = require('express'),
      mongoose = require('mongoose'),
      spawn    = require("child_process").spawn,
      bodyParser = require('body-parser'),
	  multer = require('multer'),
	  path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

let indexRoutes = require("./index.js");
app.use("/", indexRoutes);

// MongoDB set-up
mongoose.connect('mongodb://localhost:27017/yale', {useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
  if(config.download) {
      const downloadToSeed = require("./seeding/download-db-to-seed");
      downloadToSeed.exec("./seeding/seeds/new-data.json")
      .then((res)=>{
          console.log("downloaded")
      })
  }
  if(config.seed) {
    const seed = require("./seeding/main");
    seed.exec()
    .then(res=>{
        console.log("database has been seeded");
    })
  }
});

// 404 error
app.use(function (req, res, next) {
    res.status(404).send('error');
});

// 500 error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

app.listen(3000, function (){
    console.log('Server started on port 3000');
});


