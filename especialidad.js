var botId          = "st-a80b332d-0f83-5b4c-af93-71724c178aa9";
var botName        = "pruebas webwook";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var request        = require("request");
var config         = require("./config");
//var mockServiceUrl = 'https://607b24a0bd56a60017ba36a5.mockapi.io/especialistas/?especialidad=' + especialidad;

/*
 * This example showcases the 2 different ways to use the webhook node:
 *  Synchronously (FindNearbyCabs)
 *  Asynchronously (BookTheCab)
 */

//Make request to mockservice app
function findCabs(/*userLoc*/) {
    return new Promise(function(resolve, reject) {
        request({
            url: mockServiceUrl,
            method: 'get',
        }, function(err, res) {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(res.body));
        });
    });
}



module.exports = {
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
        sdk.sendBotMessage(data, callback);
    },
    on_bot_message  : function(requestId, data, callback) {
        sdk.sendUserMessage(data, callback);
    },
    on_webhook      : function(requestId, data, componentName, callback) {
        var context = data.context;
        var especialidad = context.entities.especialista_name;
        mockServiceUrl = 'https://607b24a0bd56a60017ba36a5.mockapi.io/especialistas/?especialidad=' + especialidad
        console.log(especialidad)
        if (componentName === 'get_especialista') {
            setTimeout(
            findCabs()
                .then(function(cabList) {
                    context.cabList = cabList;
                    callback(null, data);
                    console.log(cabList)
                })
            ,120000);
        } 
    }
};