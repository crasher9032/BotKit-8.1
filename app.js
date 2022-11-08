var Application = require("./lib/app");
var Server      = require("./lib/server");
var sdk         = require("./lib/sdk");
var config      = require("./config");
const express = require("express");

var app    = new Application(null, config);
var server = new Server(config, app);
const exp = express();

server.start();

sdk.registerBot(require('./FindAFlight.js'));
sdk.registerBot(require('./SimpleConversationalBot.js'));
sdk.registerBot(require('./SimpleConversationalBotWithMultipleBotId.js'));
sdk.registerBot(require('./GuessTheNumber.js'));
sdk.registerBot(require('./BookACab.js'));
sdk.registerBot(require('./OrderAPizza.js'));
sdk.registerBot(require('./BotVariables.js'));
sdk.registerBot(require('./LiveChat.js'));
sdk.registerBot(require('./formulario'));


exp.post('/form', function(req, res){
    try {
        console.log(req.body);
        sdk.saveData(req.body.id, re.body)
        .then(function() {
            //Finished
            data.success = 'true';
            callback(null, 'Terminado');
            res.send({
                "status": "success",
            });
        });
    } catch (error) {
        res.sendStatus(404, error);
    }
});

exp.listen(3000);