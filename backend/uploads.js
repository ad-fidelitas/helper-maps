const app = require("express");
const router = app.Router();
const path = require('path');

// img upload storage engine
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



// img init upload
var upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('newPost');

function checkFileType (file, cb) {
    // Allowed extensions
    var filetypes = /jpeg|jpg|png/;
    // check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    var mimetype = filetypes.test(file.mimetype);
    if (extname && extname) {
        return cb(null, true);
    }
    cb('Error: Images only');
}


router.post("/upload", function(req,res){
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send('ERROR in uploading file');
        } else {
            if(req.file == undefined) {
				return res.status(400).send('ERROR in uploading file');
            }
            console.log(req.file.filename);
            Location.create({
				coordinates:  
                imgPath: '/images/' + req.file.filename,
                content: req.body.content
            }, function (err, post) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(post);
                    User.findOne({username : req.user.username}, function (err, foundUser) {
                        if (err) {
                            console.log(err);
                        } else {
                            foundUser.posts.push(post._id);
                            foundUser.save();
                            console.log(foundUser.posts);
                            res.redirect('/profile/' + req.user.username);
                        }
                    });
                }
            });
        }
});
});



module.exports = router;
