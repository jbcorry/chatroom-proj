var Group = require('../schemas/groupSchema');
var keys = require('../keys.js');

module.exports = {

  addGroup: function(req, res) {
    var group = {
      name: req.body.name,
      password: req.body.password,
      description: req.body.description,
      user: req.body.user
    };

    new Group(group).save(function(err, data){
      console.log(req.body);
      if (err){
        res.status(500).send(err);
      }else{
        res.send(data);
      }
    });
  },

  getGroups: function(req, res) {
    Group.find().then(function(response){
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
    var AWS = require('aws-sdk');
    console.log('in groupController');
    AWS.config.update({
        accessKeyId: keys.amazonAccess,
        secretAccessKey: keys.amazonSecret,
        region: keys.amazonRegion
    });
    var keys = require('./keys.js');
    var s3 = new AWS.S3();
    var exports = module.exports = {};
    exports.saveImage = function (req, res) {
  buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'northpoint-test-bucket/' + req.body.userEmail;
  var params = {
      Bucket: bucketName,
      Key: req.body.imageName,
      Body: buf,
      ContentType: 'image/' + req.body.imageExtension,
      ACL: 'public-read',
  };
  s3.upload(params, function (err, data) {
    if (err) return res.status(500).send(err);
    else {
      req.json(data);
    }
  });
};
}


};
