const express = require('express');
const path = require('path');
const randomId = require('random-id');
var mongoose = require('mongoose');
var router = express.Router();
var PairSchema = require('./models/PairSchema');
var cors = require('cors');
const Setting = require('./models/SettingSchema');
const app = express();
bodyParser = require("body-parser");
port = 3088;

app.use(cors());

var query = 'mongodb://root:6nGDVJsEr69A6Len'
    + '@mongodb:27017/tvvf?'
    + 'retryWrites=true&w=majority'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
    useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});

module.exports = router;

let indexes = [];

app.use(bodyParser.json());

app.get('/api/pairs', (req, res) => {
    PairSchema.find(function(err, data) {
        if(err){
            res.json({ 'message':'Error: '+err,'success':false});
            console.log(err);
        }
        else{
            indexes = data;
            res.json(indexes);
        }
    });
});

app.post('/api/pair', (req, res) => {
    var pair = req.body.pair;
    var newPair = new PairSchema(pair);
    newPair.save(function(err, pair) {
        if(err) {
            res.json({ 'message':'Error: '+err,'success':false});
            console.log(err);
        }
        else {
            res.json({ 'message':'Pair has been addedd','success':true});
            indexes.push(pair)
        }
    });
});

app.delete('/api/pair', (req, res) => {
    var id = req.body.index_id;
    PairSchema.remove({_id:id},
        function(err, data) {
            if(err){
                res.json({ 'message':'Error: '+err,'success':false});
                console.log(err);
            }
            else{
                var index = indexes.map(i => {
                    return i.id;
                }).indexOf(id);
                indexes.splice(index, 1);
                res.json({ 'message':'pair has been deleted','success':true});
            }
        });
});

app.post('/api/setting', async (req, res) => {
    try {
        const { key, value } = req.body;
        await Setting.deleteMany({ key });
        const newSetting = new Setting({ key, value });
        const savedSetting = await newSetting.save();
        res.json({ message: 'Setting added', success: true, data: savedSetting });
    } catch (err) {
        res.json({ message: 'Error: ' + err, success: false });
        console.log(err);
    }
});

app.get('/api/setting/all', (req, res) => {
    Setting.find({}).exec((err, settings) => {
        if (err) {
            res.json({ message: 'Error: ' + err, success: false });
            console.log(err);
        } else {
            res.json({ success: true, data: settings });
        }
    });
});

app.get('/', (req,res) => {
    res.json({'success':true});
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});