var mongoose=require('mongoose');

var SoundSchema = new mongoose.Schema({
    id:String,
    sound:Boolean,
    rankSound:Number,
});

module.exports = mongoose.model(
    'settings', PairSchema, 'Settings');