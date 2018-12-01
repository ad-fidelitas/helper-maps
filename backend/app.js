const express  = require('express'),
      mongoose = require('mongoose'),
      spawn    = require("child_process").spawn;

const app = express();
let imgName = 'park.jpg'

let runPy = new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python3',["./image-processing.py", imgName]);

    pyprog.stdout.on('data', function(data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});

app.get('/img', (req, res) => {

    //res.write('Access Total\n');

    runPy.then(function(fromRunpy) {
        accessTotal = fromRunpy.toString();
        console.log(accessTotal);
        res.send(accessTotal)
    });
});

// MongoDB set-up
mongoose.connect('mongodb://localhost:27017/yale', {useNewUrlParser:true});

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


