var mongoose=require('mongoose');

var PairSchema = new mongoose.Schema({
    id:String,
    pair:String,
    rank:Number,
    screener:String,
    exchange:String,
    interval:String
});

module.exports = mongoose.model(
    'indexes', PairSchema, 'Indexes');