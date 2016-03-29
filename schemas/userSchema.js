var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var User = Schema({
 firstName:{type:String, required: false},
 lastName:{type:String, required: false},
 username:{type: String, unique: true},
 email:{type:String, required: false},
 password:{type:String, required: true},

 // loc: {
 //    type: {type:String, default: 'Point'},
 //    coordinates: [{lat: Number, long: Number}]
 // },
    date:{type: Date, default: new Date()}

});
// User.index({loc: '2dsphere'});



module.exports = mongoose.model('User', User);
