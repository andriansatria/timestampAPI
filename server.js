var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');

var app = express();
app.set('views', (__dirname, 'public'));
app.set('view engine', 'jade');


app.get('/', function(req, res) {
    res.render('index.jade')
});

app.get('/:time',function(req, res) {
    //grab the time variable
    var time = req.params.time;
    var result = {};
    //check if it unix time format
    if (moment(time, 'LL', true).isValid()) {
        result = {
            unix : moment(time, 'LL').unix(),
            natural : time
        }
    } else if(moment(time, 'X', true).isValid()) {
        result = {
            unix : time,
            natural : moment(time, 'X').format('MMMM DD, YYYY')
        }
    } else {
        result = {
            unix : null, 
            natural: null
        }
    }
    res.send(result);
});


app.listen(3000);
console.log('app run on : localhost:'+3000);