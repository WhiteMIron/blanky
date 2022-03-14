const path = require("path");
const multer = require("multer");
// const multerS3 = require('multer-s3');
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");
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
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: "resized",
        key: function (req, file, cb) {
          cb(null, 'userProFile/'+ Date.now()+'_'+ file.originalname.toString());
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize({width:500}));
        },
      },
    ],
    acl: "public-read-write",
  }),
})

exports.upload2= multer({
  storage: multerS3({
    s3: s3,
    bucket: "blanky",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: "resized",
        key: function (req, file, cb) {
          cb(null, 'textbookFiletest/'+ Date.now()+'_'+ file.originalname.toString());
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize({width:500}));
        },
      },
    ],
    acl: "public-read-write",
  }),
})
