var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var Message = Schema({
 message:{type:String, required: true},
 date:{type: Date, default: new Date()}

});


module.exports = mongoose.model('Message', Message);
