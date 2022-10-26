var express = require('express');
var jimp = require('jimp');
var multer = require('multer');
var userModel = require('./users')

var router = express.Router();

// var url = `./public/images/uploads/photo.png`;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads")
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random())* 10000 +"-"+ file.originalname; //"photo.png";//
    cb(null, fn)
  }
})



const upload = multer({ storage })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/upload',upload.single("image"), function (req, res) {
  res.render('image',{data:req.file})
});

router.get("/greyscale/:image",function(req,res){
  jimp.read(`./public/images/uploads/${req.params.image}`, function(err, data){//
    if (err) throw err;
    data
      .greyscale() // set greyscale
      .write('./public/images/uploads/greyscaled-small-bw.jpg'); // save
      // url = './public/images/uploads/greyscaled-small-bw.jpg';
      res.render('image', {data : {filename : 'greyscaled-small-bw.jpg'}})
  });
})



// router.get("/greyscale/:image",function(req,res){
//   jimp.read(`./public/images/uploads/${req.params.image}`,function(err,data){
//     console.log(data);
//     data.greyscale()
//     .write(`./public/images/uploads/"GrayscaledImage.jpg"`); // save
//   })
// })

// router.get("/greyscale",function(req,res){
//   jimp.read("1664268231151-Batman-Cartoon-HD1.png", (err, lenna) => {
//     if (err) throw err;
//     lenna
//       .resize(256, 256) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write('edited-small-bw.png'); // save
//   })
//   res.send("HEY")
// })


router.get("/invert/:image",function(req,res){
  jimp.read(`./public/images/uploads/${req.params.image}`, function(err, data){
    if (err) throw err;
    data
      .invert() // set greyscale
      .write('./public/images/uploads/inverted-small-bw.jpg'); // save
      res.render('image', {data : {filename : 'inverted-small-bw.jpg'}})
  });
})


router.get("/normalize/:image",function(req,res){
  jimp.read(`./public/images/uploads/${req.params.image}`, function(err, data){
    if (err) throw err;
    data
      .normalize() // set greyscale
      .write('./public/images/uploads/normalize-small-bw.jpg'); // save
      res.render('image', {data : {filename : 'normalize-small-bw.jpg'}})
  });
})

router.get("/sepia/:image",function(req,res){
  jimp.read(`./public/images/uploads/${req.params.image}`, function(err, data){
    if (err) throw err;
    data
      .sepia() // set greyscale
      .write(`./public/images/uploads/sepia-small-bw.jpg`); // save
      res.render('image', {data : {filename : 'sepia-small-bw.jpg'}})
  });
})


router.get("/blur/:image",function(req,res){
  jimp.read(`./public/images/uploads/${req.params.image}`, function(err, data){
    if (err) throw err;
    data
      .blur(25) // set greyscale
      .write(`./public/images/uploads/blur-small-bw.jpg`); // save
      res.render('image', {data : {filename : 'blur-small-bw.jpg'}})
  });
})


router.get("/undo",function(req,res){
  res.redirect(req.headers.referer);
})

module.exports = router;

































































