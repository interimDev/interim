var express = require("express");
var app = express();




app.use('/', express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));


var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
