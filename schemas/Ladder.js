var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ladderSchema = new Schema({
    username: String,
    wins: Number,
    losses: Number,
    timePlayed : String
});

ladderSchema.virtual('ID').get(function(){
    return this._id.toHexString();
});

ladderSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Ladder', ladderSchema);