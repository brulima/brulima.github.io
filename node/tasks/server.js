var express = require('express');
var app     = express();
var fs      = require('fs');

app.use(express.static('../'));


var server = app.listen(8080, function() {
	var host = 'homolog.com.br';
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});