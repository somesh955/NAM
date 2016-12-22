var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules/angular'));

app.listen(3000);

console.log("Server start: http://localhost:3000")