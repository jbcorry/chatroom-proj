var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var User = Schema({
 username:{type: String, unique: true},
 password:{type:String, required: true},


    date:{type: Date, default: new Date()}

});

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, salt);
};

User.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', User);
