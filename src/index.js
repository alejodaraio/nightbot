var express = require('express');
var http_app = express();

http_app.get('/', function(req, res){
   res.send('nightbot!');
});

http_app.listen(80, function () {
    console.log('http is UP!');
});