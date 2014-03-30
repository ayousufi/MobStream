var express = require('express');
var app = express();
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://chatroom.db');
var engines = require('consolidate');
var colors = require('colors');
var moment = require('moment');
app.engine('html', engines.hogan); // tell Express to run .html files through Hogan
app.set('views', __dirname + '/now-playing'); // tell Express where to find templates

app.use(express.bodyParser()); // definitely use this feature
app.use(express.static(__dirname));

conn.query('CREATE TABLE IF NOT EXISTS tracks (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, mobname TEXT, trackid TEXT);');

app.post('/', function(request, response){
	
});

app.get('/', function(request, response){
    response.render("index.html");
});

var port = process.env.PORT || 8080;
app.listen(port);
