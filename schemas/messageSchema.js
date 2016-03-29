var mongoose = require('mongoose'),
Schema = mongoose.Schema;
console.log('this is the mongoose schema', mongoose.Schema)

var Message = Schema({
 message:{type:String, required: true},
 date:{type: Date, default: new Date()},
 user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
 location: {type:String}

});

// Message.pre('find', function(next){
//   this.populate('user');
//   next();
// });

module.exports = mongoose.model('Message', Message);
