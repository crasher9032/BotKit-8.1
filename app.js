var Application = require("./lib/app");
var Server      = require("./lib/server");
var sdk         = require("./lib/sdk");
var config      = require("./config");

var app    = new Application(null, config);
var server = new Server(config, app);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const universal = require('./formularioUniversal');
var exp = express();

server.start();

// sdk.registerBot(require('./FindAFlight.js'));
// sdk.registerBot(require('./SimpleConversationalBot.js'));
// sdk.registerBot(require('./SimpleConversationalBotWithMultipleBotId.js'));
// sdk.registerBot(require('./GuessTheNumber.js'));
// sdk.registerBot(require('./BookACab.js'));
// sdk.registerBot(require('./OrderAPizza.js'));
// sdk.registerBot(require('./BotVariables.js'));
// sdk.registerBot(require('./LiveChat.js'));
//importacion webhook personlizado
sdk.registerBot(universal);

exp.use(cors());
exp.use(bodyParser.json());
exp.use('/universal', universal.form);
exp.listen(3000);