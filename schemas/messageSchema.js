var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Message = Schema({
 message:{type:String, required: true},
 date:{type: Date, default: new Date()},
 user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
 location: {type:String, default: ''},
 group: {type: mongoose.Schema.Types.ObjectId, ref:'Group', required: true}

});

// Message.pre('find', function(next){
//   this.populate('user');
//   next();
// });

module.exports = mongoose.model('Message', Message);
