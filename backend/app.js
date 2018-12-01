const express = require('express'),
      mongoose = require('mongoose');

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

app.listen(3005, function (){
    console.log('Server started on port 3000');
});


