var Message = require('../schemas/messageSchema');

module.exports = {


addMessage: function(req, res) {
  new Message(req.body).save(function(err, data){
    console.log(req.body);
    if (err){
      res.status(500).send(err);
    }else{
      res.send(data);
    }
  });
},

getMessages: function(req, res) {
  Message.find().then(function(response){
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
}


};
