var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
// var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mongoUri = 'mongodb://jbcorry:morton@ds011790.mlab.com:11790/personal-proj';

var msgCtrl = require('./controllers/msgCtrl.js');
var User = require('./schemas/userSchema.js');
var groupCtrl = require('./controllers/groupCtrl.js');
var userCtrl = require('./controllers/userCtrl.js');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: true
}));

//image posting

app.post('/api/newimage', groupCtrl.postImage);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/');
});

app.use(express.static('./public'));


//passport-local stuff

passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
function(email, password, cb) {
  User.findOne({
    username: email,
    password: password
  }, function(err, user) {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false);
    }
    if (user.password != password) {
      return cb(null, false);
    }
    return cb(null, user);
  });
}));


passport.use('local-signup', new LocalStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true
 }, function(req, username, password, done) {
     User.findOne({'username': username}, function(err, user) {
         if (err) return done(err);
         if (user) return done(null, false);
         else {
             var newUser = new User(req.body);
             newUser.save(function(err, response) {
                 console.log(response + "here is the response");
                 if (err) return done(null, err);
                 else return done(null, response);
             });
         }
     });
 }));


passport.serializeUser(function(user, done) {
     console.log(user + "this is a user before we serializeUser");
   done(null, user.id);
 });

passport.deserializeUser(function(user, cb) {
 User.findById(user, function(err, user) {
   if (err) {
     return cb(err);
   }
   cb(null, user);
 });
});


//socket stuff

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('ctrl message', function(msg){
    io.emit('message from socket', msg);

  });
  socket.on('delete this message', function(index){

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



//endpoints

    //chat endpoints

app.get('/chatroom/', msgCtrl.getMessages);


app.post('/chatroom/', msgCtrl.addMessage);

app.delete('/chatroom/:id', msgCtrl.deleteMessage);

app.delete('/chatroom/', msgCtrl.deleteAll);

//group endpoints

app.get('/groups/', groupCtrl.getGroups);

app.post('/groups/', groupCtrl.addGroup);

app.delete('/groups/:id', groupCtrl.deleteGroup);

app.delete('/groups/', groupCtrl.deleteAllGroups);

    //login endpoints

app.post('/user', userCtrl.addUser);

app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/login'}),
function(req, res){
   res.status(200).send('signed up');
}
);


app.post('/login', passport.authenticate('local-login', {
 failureRedirect: '/login'
}), function(req, res) {
 console.log("logged in");
 res.status(200).send({
   msg: 'okay!',
   user: req.session.passport
 });
});

app.get('/logout', function(req, res) {

 req.logout();
 req.session.destroy();
 console.log('logged out');
 res.redirect('/login');
});



mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected');
});
//
//
// app.use(session({secret: 'gypsy'}));
//
// app.use(passport.initialize());
//
// app.use(passport.session());

// app.get('/chatroom', function(req, res){
//   res.sendFile(__dirname + '/public/views/chatroom.html');
// });


// passport.use(new FacebookStrategy({
//   clientID: keys.id,
//   clientSecret: keys.key,
//   callbackURL: 'http://localhost:3000/auth/facebook/callback'
// }, function(token, refreshToken, profile, done) {
//   return done(null, profile);
// }));
//
// app.get('/auth/facebook', passport.authenticate('facebook'));
//
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/me',
//   failureRedirect: '/login'
// }));
//
// app.get('/api/chatroom', function(req, res) {
//   res.send(req.messages);
// });
//
// passport.serializeUser(function(dataToSerialize, done) {
//     done(null, dataToSerialize);
// });
//
// passport.deserializeUser(function(dataFromSessionToPutOnReqDotUser, done) {
//   done(null, dataFromSessionToPutOnReqDotUser);
// });
//
// app.get('/me', function(req, res) {
//   res.send(req.user);
// });

// app.listen(9000, function(){
//   console.log('server started successfully on port 9000');
// });
