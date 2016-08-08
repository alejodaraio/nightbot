#Nightbot - Current Song!

With this service you can show in your Stream the current song playing in Nightbot

##Configuration

#### Nightbot
1. Need create a new aplication https://beta.nightbot.tv/account/applications
2. In the new application you must add two redirect URIs
    The First URI is for autorize the app
    The Second URI is for show the current song.
    
> https://nightbot.mydomain.com/autorize
> https://nightbot.mydomain.com/currentsong 

#### App
1. You must setup the config with Enviroments

```
    NIGHTBOT_API
    NIGHTBOT_CLIENT_ID
    NIGHTBOT_CLIENT_SECRET
    NIGHTBOT_REDIRECT_AUTORIZE
    NIGHTBOT_REDIRECT_CURRENT_SONG
    NIGHTBOT_OAUTH2_TOKEN
    NIGHTBOT_REQUEST_QUEUE
```

#### StartUp

I recommend use Heroku.com to host the App, the implementation is very easy there. But if don't want use Heroku the steps are:

```javascript
npm install
```
```javascript
npm start
```