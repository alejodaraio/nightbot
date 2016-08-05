var express = require('express');
var http_app = express();

http_app.set('port', (process.env.PORT || 5000));

http_app.get('/', function(req, res){
   res.send('nightbot!');
});

http_app.listen(http_app.get('port'), function () {
    console.log('http is UP!');
});

module.exports = http_app;