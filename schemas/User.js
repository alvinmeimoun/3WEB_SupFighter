var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

userSchema.virtual('ID').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', userSchema);

