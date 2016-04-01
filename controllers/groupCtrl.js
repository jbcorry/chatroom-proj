var Group = require('../schemas/groupSchema');

var AWS = require('aws-sdk');
var keys = require('../config.js');
var fs = require('fs');

AWS.config.update({
    accessKeyId: keys.amazonAccess,
    secretAccessKey: keys.amazonSecret,
    region: keys.amazonRegion
});


var s3 = new AWS.S3();

module.exports = {

  addGroup: function(req, res) {
    console.log(req.body);
    var group = {
      name: req.body.name,
      password: req.body.password,
      description: req.body.description,
      user: req.body.user._id.user,
      messages: []
    };

    new Group(group).save(function(err, data){
      console.log(req.body);
      if (err){
        console.log(err);
        res.status(500).send(err);
      }else{
        res.send(data);
      }
    });
  },

  getGroups: function(req, res) {
    Group.find().populate('message').exec().then(function(response){
      res.send(response);
    });
  },

  deleteGroup: function(req, res) {
    var id = req.params.id;
    Group.findByIdAndRemove(id, function (err, resp) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(resp);
      }
    });
  },

  deleteAllGroups: function(req, res) {
    Group.remove(function (err, resp) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(resp);
      }
    });
  },
  postImage: function(req, res) {
    // var fileStream = fs.createReadStream(req.body);
    // fileStream.on('error', function(err) {
    //   if (err) { throw err; }
    // });
    //
    // fileStream.on('open', function() {});


    // exports.saveImage = function (req, res) {
  var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  console.log('saving image');
  // bucketName var below crates a "folder" for each user
  var bucketName = 'northpoint-test-bucket/' /*+ req.body.userEmail*/;
  // console.log(buf);
  var params = {
      Bucket: bucketName,
      Key: req.body.imageName,
      Body: buf,
      ContentType: 'image/' + req.body.imageExtension,
      ACL: 'public-read',
  };
  // console.log(s3.config);
  s3.upload(params, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    else {
      res.json(data);
      console.log('uploading');
    }
  });

}


};
