var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var Group = Schema({
 name:{type:String, required: true},
 password:{type:String, required: true},
 description:{type: String, required: true},
 user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
 messages: [{type:mongoose.Schema.Types.ObjectId, ref: 'Message'}],
 date:{type: Date, default: new Date()}

});


module.exports = mongoose.model('Group', Group);
