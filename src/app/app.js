var express = require('express');
var app = express();
var path    = require("path");
app.use('/img', express.static(__dirname + '/img'));
app.use('/img', express.static(__dirname + '/sass'));
app.use('/stylesheet',  express.static(__dirname + '/stylesheet'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/admin.scss',  express.static(__dirname + '/admin.scss'));
app.use('/fonts',  express.static(__dirname + '/fonts'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app.config.js',  express.static(__dirname + '/app.config.js'));
app.use('/app.module.js',  express.static(__dirname + '/app.module.js'));
app.use('/views',  express.static(__dirname + '/views'))
// app.use('/views',  express.static(__dirname + '/admin.html'));
app.use('/app',  express.static(__dirname + '/app'));
app.get('/admin', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/admin/admin.html'));
});
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
