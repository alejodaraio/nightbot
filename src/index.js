var express = require('express');
var http_app = express();
var request = require('request');

const NIGHTBOT_API = 'https://beta.nightbot.tv';
const NIGHTBOT_CLIENT_ID = '15ba6d3a60e6e5cd684311ea1d86904d';
const NIGHTBOT_CLIENT_SECRET = '3830fbadc4bf402a20ed5e1442a65f74';
const NIGHTBOT_REDIRECT_AUTORIZE = 'https://nightbot.herokuapp.com/autorize';
const NIGHTBOT_REDIRECT_OAUTH2TOKEN = 'https://nightbot.herokuapp.com/oauth2token';
const NIGHTBOT_OAUTH2_TOKEN = 'https://api.nightbot.tv/oauth2/token';
const NIGHTBOT_REQUEST_QUEUE = 'https://api.nightbot.tv/1/song_requests/queue';

//init settings
http_app.set('port', (process.env.PORT || 5000));
http_app.set('views', __dirname + '/views');
http_app.set('view engine', 'ejs');


//configure the routes
http_app.get('/', function (req, res) {
    res.render('pages/index', {
        nightbot_oauth: nightBot_autorize_url(NIGHTBOT_CLIENT_ID)
    });
});

http_app.get('/oauth2token', function (req, res) {
    res.send('Current Song');
});

http_app.get('/autorize', function (req, res) {
    nightBot_oauth2token(req.query.code, function (result) {
       res.send(result);
    });
});

http_app.listen(http_app.get('port'), function () {
    console.log('http is UP!');
});

//helpers
function nightBot_autorize_url(client_id) {
    return NIGHTBOT_API + '/oauth2/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + NIGHTBOT_REDIRECT_AUTORIZE;
}

function nightBot_oauth2token(code, callback) {

    request.post(NIGHTBOT_OAUTH2_TOKEN,
        {
            form: {
                client_id: NIGHTBOT_CLIENT_ID,
                client_secret: NIGHTBOT_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: NIGHTBOT_REDIRECT_OAUTH2TOKEN,
                code: code
            }
        },
        function (err, httpResponse, body) {
            callback(body);
        }
    );
}

function nightBot_requestSong(token) {
    var url = '';
}