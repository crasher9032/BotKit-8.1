var Application = require("./lib/app");
var Server      = require("./lib/server");
var sdk         = require("./lib/sdk");
var config      = require("./config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const formulario = require("./formulario");

var app    = new Application(null, config);
var server = new Server(config, app);
var exp = express();

server.start();

sdk.registerBot(require('./FindAFlight.js'));
sdk.registerBot(require('./SimpleConversationalBot.js'));
sdk.registerBot(require('./SimpleConversationalBotWithMultipleBotId.js'));
sdk.registerBot(require('./GuessTheNumber.js'));
sdk.registerBot(require('./BookACab.js'));
sdk.registerBot(require('./OrderAPizza.js'));
sdk.registerBot(require('./BotVariables.js'));
sdk.registerBot(require('./LiveChat.js'));
sdk.registerBot(formulario);

exp.use(cors());
exp.use(bodyParser.json());
exp.use('/form', formulario.form);

exp.listen(3000);