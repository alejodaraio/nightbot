var express = require('express');
var http_app = express();
var port = process.env.PORT || 8080;

http_app.get('/', function(req, res){
   res.send('nightbot!');
});

http_app.listen(port, function () {
    console.log('http is UP!');
});