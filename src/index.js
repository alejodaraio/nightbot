var express = require('express');
var http_app = express();

const NIGHTBOT_API = 'https://beta.nightbot.tv';
const NIGHTBOT_REDIRECT = 'https://nightbot.herokuapp.com/currentsong';
const NIGHTBOT_REQUEST_QUEUE = 'https://api.nightbot.tv/1/song_requests/queue';

//init settings
http_app.set('port', (process.env.PORT || 5000));
http_app.set('views', __dirname + '/views');
http_app.set('view engine', 'ejs');


//configure the routes
http_app.get('/', function (req, res) {
    res.render('pages/index', {
        nightbot_oauth: nightBot_autorize_url('15ba6d3a60e6e5cd684311ea1d86904d')
    });
});

http_app.get('/currentsong', function(req, res){
    res.send('Lalalal Song' + req.query.code);
});

http_app.listen(http_app.get('port'), function () {
    console.log('http is UP!');
});

//helpers
function nightBot_autorize_url(client_id) {
    return NIGHTBOT_API + '/oauth2/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + NIGHTBOT_REDIRECT;
}

function nightBot_requestSong(code) {
    var url = '';
}