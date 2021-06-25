const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');
const aws = require("aws-sdk");
require('dotenv').config()


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.REGION
})


exports.upload= multer({
  storage: multerS3({
    s3: s3,
    bucket: "blanky",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, 'userProFile/'+ Date.now()+'_'+ file.originalname.toString());
    },
    acl: 'public-read-write',
  })
})
