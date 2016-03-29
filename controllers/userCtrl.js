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
       var id = req.params.id;
       User.findById(id, function (err, resp) {
               if (err) {
                   res.status(500).json(err);
               } else {
                   res.status(200).json(resp);
               }
           });
   },

   addLoc: function (req, res) {
       User.findById(req.query.id, function (err, user) {
           if (err) {
               res.status(500).send(err);
           } else {
               user.loc.coordinates.
               push(req.body);
               user.save(function (err, data) {
                   if (err) {
                       res.status(500).send(err);
                   } else {
                       res.send(data);
                   }
               });
           }
       });
   },

   getLoc: function (req, res) {
       User.findById(req.query.userId, function (err, userItem) {
           if (err) {
               res.status(500).send(err);
           } else {
               res.send(userItem.loc.id(req.query.locId));
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
