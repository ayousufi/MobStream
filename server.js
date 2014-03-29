var express = require('express');
var app = express();
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://chatroom.db');
var engines = require('consolidate');
var colors = require('colors');
var moment = require('moment');
app.engine('html', engines.hogan); // tell Express to run .html files through Hogan
app.set('views', __dirname + '/templates'); // tell Express where to find templates

app.use(express.bodyParser()); // definitely use this feature
app.use(express.static(__dirname));

app.get('*', function(request, response){
    response.render("index.html");
});

var port = process.env.PORT || 8080;
app.listen(port);