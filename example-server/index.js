var express = require('express'),
	rowFactory = require('rowFactory'),
	cors = require('cors');

var port = process.argv[2] || 8000;

express()
.use(cors())
.get('/', function (req, res) {
	"use strict";

	res.send(
		Array
		.apply(null, {length:100})
		.map(rowFactory)
	);

})
.listen(port);

console.log('http server started on port', port, '...');