var express = require('express'),
	rowFactory = require('rowFactory');

var app = express(),
	port = process.argv[2] || 8000;

app.get('/', function (req, res) {
	"use strict";

	res.send(
		Array
		.apply(null, {length:100})
		.map(rowFactory)
	);

});

app.listen(port);

console.log('http server started on port', port, '...');