var User =require('../schemas/userSchema.js');


module.exports = {

   addUser: function (req, res) {
       new User(req.body).save(function (err, data) {
           if (err) {
               res.status(500).send(err);
           } else {
               res.send(data);
           }
       });
   },

   getUser: function (req, res) {
     console.log('in the backend');
       var id = req.params.id;
       User.findById(id, function (err, resp) {
               if (err) {
                   res.status(500).json(err);
               } else {
                   res.status(200).json(resp);
               }
           });
   },

   isAuth: function( req, res, next ) {
           if(req.user) {
               console.log(req.user + "another console.log");
               next();
           } else {
           res.send({msg:'Not Allowed'});
           }
       },

   deleteUser: function (req, res) {
       var id = req.params.id;
       User.findByIdAndRemove(id, function (err, resp) {
           if (err) {
               res.status(500).json(err);
           } else {
               res.status(200).json(resp);
           }
       });
   }















};
