var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost:27017/chatroom';

var msgCtrl = require('./controllers/msgCtrl.js');


app.use(bodyParser.json());



app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/');
});

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


app.get('/chatroom', msgCtrl.getMessages);


app.post('/chatroom', msgCtrl.addMessage);

app.delete('/chatroom/:id', msgCtrl.deleteMessage);


app.use(express.static(__dirname + '/public'));

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
