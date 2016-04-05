process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
// var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./config.js');
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

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected');
});

app.use(require('cookie-parser')());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());


//image posting

app.post('/api/newimage', groupCtrl.postImage);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/');
});

app.use(express.static(__dirname + '/public'));


//passport-local stuff

passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},

//login auth
function(username, password, cb) {
  User.findOne({username: username}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (!user.validatePassword(password)) { console.log('password wrong'); return cb(null, false); }
      return cb(null, user);
    });
}));

//signup auth
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
            console.log(newUser);
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err, response) {
                if (err) return done(null, err);
                else return done(null, response);
            });
        }
    });
}));


passport.serializeUser(function(user, done) {
    //  console.log(user + "this is a user before we serializeUser");
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

//login endpoints

app.post('/user', userCtrl.addUser);

app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/signup'}),
function(req, res){
res.status(200).send('signed up');
}
);

app.post('/login', passport.authenticate('local-login', {
 failureRedirect: '/login'
}), function(req, res) {
 console.log("logged in");
 res.status(200).send({
   username: req.body.username,
   password: req.body.password,
   _id: req.session.passport
 });
});

app.get('/logout', function(req, res) {

 req.logout();
 req.session.destroy();
 console.log('logged out');
 res.redirect('/login');
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




http.listen(port, function(){
  console.log('listening on ' + port);
});



//endpoints

    //chat endpoints

app.get('/groups/chatroom', msgCtrl.getMessages);


app.post('/groups/', msgCtrl.addMessage, groupCtrl.addGroup);

app.delete('/groups/', msgCtrl.deleteMessage);

app.delete('/groups/', msgCtrl.deleteAll);

//group endpoints

app.get('/groups/', groupCtrl.getGroups);

// app.post('/groups/', groupCtrl.addGroup);

app.delete('/groups/:id', groupCtrl.deleteGroup);

// app.delete('/groups/', groupCtrl.deleteAllGroups);





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
