var express = require('express');
var http_app = express();
var request = require('request');

const NIGHTBOT_API = (process.env.NIGHTBOT_HOST || 'https://beta.nightbot.tv');
const NIGHTBOT_CLIENT_ID = (process.env.NIGHTBOT_CLIENT_ID || null);
const NIGHTBOT_CLIENT_SECRET = (process.env.NIGHTBOT_CLIENT_SECRET || null);
const NIGHTBOT_REDIRECT_AUTORIZE =(process.env.NIGHTBOT_REDIRECT_AUTORIZE || 'https://nightbot.herokuapp.com/autorize');
const NIGHTBOT_REDIRECT_CURRENT_SONG = (process.env.NIGHTBOT_CURRENT_SONG || 'https://nightbot.herokuapp.com/currentsong');
const NIGHTBOT_OAUTH2_TOKEN = (process.env.NIGHTBOT_OAUTH2_TOKEN || 'https://api.nightbot.tv/oauth2/token');
const NIGHTBOT_REQUEST_QUEUE = (process.env.NIGHTBOT_REQUEST_QUEUE || 'https://api.nightbot.tv/1/song_requests/queue');

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

http_app.get('/currentsong', function (req, res) {
    nightBot_currentSong(req.query.token,
        function (currentsong) {
            res.send(currentsong);
        }
    );
});

http_app.get('/autorize', function (req, res) {
    nightBot_oauth2token(req.query.code, function (token) {
        res.writeHead(301,
            {Location: NIGHTBOT_REDIRECT_CURRENT_SONG + '?token=' + token}
        );
        res.end();
    });
});

http_app.listen(http_app.get('port'), function () {
    console.log('http is UP!');
});

//helpers
function nightBot_autorize_url(client_id) {
    return NIGHTBOT_API + '/oauth2/authorize?scope=song_requests_queue&response_type=code&client_id=' + client_id + '&redirect_uri=' + NIGHTBOT_REDIRECT_AUTORIZE;
}

function nightBot_oauth2token(code, callback) {

    request.post(NIGHTBOT_OAUTH2_TOKEN,
        {
            form: {
                client_id: NIGHTBOT_CLIENT_ID,
                client_secret: NIGHTBOT_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: NIGHTBOT_REDIRECT_CURRENT_SONG,
                code: code
            }
        },
        function (err, httpResponse, body) {
            body = JSON.parse(body);
            callback(body.access_token);
        }
    );
}

function nightBot_currentSong(token, callback) {

    var options = {
        url: NIGHTBOT_REQUEST_QUEUE,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    request.get(options, function (error, response, body) {
        body = JSON.parse(body);
        var song = null;
        if(body._currentSong !== null) {
            song = body._currentSong.track.title;
        }
        callback(song);
    });
}