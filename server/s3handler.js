const aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      Config = require('./config.js');

const s3 = new aws.S3({
  accessKeyId: Config["S3KEY"],
  secretAccessKey: Config["S3SECRET"],
  region: "us-west-2",
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '00hamsters',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
}).single('audiofile');

app.post('/upload', function(req, res) {
  console.log('attemtping');
  upload(req, res, function(err) {
    if (err) {
      console.error(err);
      return;
    } else {
      res.json(req.file);
    }
  })
});
