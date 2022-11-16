var botId          = "st-67e8fe6d-8737-5c43-bb6b-033e35f12d69";
var botName        = "Webhook Bot";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var request        = require("request");
var config         = require("./config");
const requestStore = require("./lib/sdk/lib/requestStore");
const form = require("express").Router();
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
    form,
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
	console.log("on user 1");
        sdk.sendBotMessage(data, callback);
    },
    on_bot_message  : function(requestId, data, callback) {
	console.log("on user 2");
        sdk.sendUserMessage(data, callback);
    },
    on_webhook      : function(requestId, data, componentName, callback) {
        console.log("llamada al webhook");
    try{
	//callback(null, new sdk.AsyncResponse());
        var context = data.context;
        if (componentName === 'get_formulario') {
            console.log("#################"+ requestId);
            let url = 'http://ec2-54-164-250-93.compute-1.amazonaws.com/Sueltos/form-escuela.html?task=' + context.contextId;
	        context.url = url;
            callback(null, data);
        } 
        if (componentName === 'open_formulario'){
            console.log("#################"+ requestId);
            callback(null, new sdk.AsyncResponse());
            let dir = context.contextId;
            form.post(("/:" + dir), function(req, res){
                try {
                    console.log(req.body);
                    //context.dataForm = JSON.parse(req.body);
                    console.log("2");
                    // res.header("Access-Control-Allow-Origin","*");
                        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        // res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
                        // res.header("Content-Security-Policy","default-src 'none'");
                        // res.send({
                        //     "status": "success",
                        // });
                        //callback(null, req.body);
                        //console.log(data);
                        sdk.saveData(requestId, data).then(function(dataSave){
                            context.dataForm = req.body;
                            sdk.respondToHook(dataSave);
                            console.log(dataSave);
                        });
                        console.log("3");
                        //requestStore.removeRequest(data);
                } catch (error) {
                    res.send(error);
                }
            });
        }
    }catch(e){
	    console.log(e);
    }
}
};
