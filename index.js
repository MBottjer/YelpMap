var express = require('express');
var app = express();

app.get('/index.html', function(req, res){
	res.send("Hello");
});

var server = app.listen(3000, function() {
	console.log('on port %d', server.address().port);
});