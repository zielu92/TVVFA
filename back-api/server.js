const express = require('express');
const path = require('path');
const randomId = require('random-id');
var cors = require('cors');
const app = express(),
    bodyParser = require("body-parser");
port = 3088;

app.use(cors());

const indexes = [
    {
        'id': 'a1',
        'pair':'BNBBUSD',
        'rank': 0,
        'screener': 'CRYPTO',
        'exchange': 'BINANCE',
        'interval': '1m'
    },
    {
        'id': 'a2',
        'pair':'ADABUSD',
        'rank': 0,
        'screener': 'CRYPTO',
        'exchange': 'BINANCE',
        'interval': '1m'
    },
    {
        'id': 'a3',
        'pair':'TRYUSD',
        'rank': 0,
        'screener': 'forex',
        'exchange': 'FX_IDC',
        'interval': '1m'
    },
];

app.use(bodyParser.json());

app.get('/api/pairs', (req, res) => {
    res.json(indexes);
});

app.post('/api/pair', (req, res) => {
    var pair = req.body.pair;
    pair.id = randomId(10);
    indexes.push(pair);
    res.json({ 'message':'pair has been addedd','success':true});
});

app.delete('/api/pair', (req, res) => {
    var id = req.body.index_id;
    var index = indexes.map(i => {
        return i.id;
    }).indexOf(id);
    indexes.splice(index, 1);
    res.json({ 'message':'pair has been deleted','success':true});
});

app.get('/', (req,res) => {
    res.json({'success':true});
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});