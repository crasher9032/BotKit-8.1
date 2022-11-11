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

// exp.post('/form', function(req, res){
//     try {
//         console.log(req.body);
//         console.log("1");
// 	    //context.dataForm = JSON.parse(req.body);
//         console.log("2");
//         sdk.saveData(req.body.id, req.body)
//         .then(function() {
//             //Finished
//             data.success = 'true';
//             res.header("Access-Control-Allow-Origin","*");
//             res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//             res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
//             res.header("Content-Security-Policy","default-src 'none'");
//             res.send({
//                 "status": "success",
//             });
//             callback(null, 'Terminado');
//             console.log("3");
//         });
//     } catch (error) {
//         res.send(error);
//     }
// });

exp.listen(3000);
