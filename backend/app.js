const config = {
    seed:true
}
const express  = require('express'),
      mongoose = require('mongoose'),
      spawn    = require("child_process").spawn,
      bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let indexRoutes = require("./routes/index.js");
app.use("/", indexRoutes);

// MongoDB set-up
mongoose.connect('mongodb://localhost:27017/yale', {useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
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
    res.status(404).render('error');
});

// 500 error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

app.listen(3000, function (){
    console.log('Server started on port 3000');
});


