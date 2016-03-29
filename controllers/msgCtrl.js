var Message = require('../schemas/messageSchema');

module.exports = {


addMessage: function(req, res) {
  // console.log(req.body);
  var msg = {
    message: req.body.message,
    date: new Date(),
    user: req.body.user,
    location: req.body.Location
  };
  // console.log(msg);
  new Message(msg).save(function(err, data){
    if (err){
      res.status(500).send(err);
    }else{
      res.send(data);
    }
  });
},

getMessages: function(req, res) {
  Message.find().populate('user').exec().then(function(response){
    res.send(response);
  });
},
deleteMessage: function(req, res) {
  var id = req.params.id;
  Message.findByIdAndRemove(id, function (err, resp) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(resp);
    }
  });
},
deleteAll: function(req, res) {
  Message.remove(function (err, resp) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(resp);
    }
  });
},

};
