const config = {
    seed:true
}

const express  = require('express'),
      mongoose = require('mongoose'),
      spawn    = require("child_process").spawn;

const app = express();
let imgName = 'park.jpg'

let indexRoutes = require("./routes/index.js");
app.use("/", indexRoutes);

// MongoDB set-up
mongoose.connect('mongodb://localhost:27017/yale', {useNewUrlParser:true});

// mongoose.on("connect")
// .then((res)=>{
//     if(seed) {
//     }
// })

app.get('/', (req, res) => {
    res.render('index');
})

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


