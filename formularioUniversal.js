var botId          = "st-5f411293-4e68-571c-8f9c-fbf7f4132f51";
var botName        = "El Universal";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var request        = require("request");
var config         = require("./config");
const requestStore = require("./lib/sdk/lib/requestStore");
const form = require("express").Router();

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
            var context = data.context;
            if (componentName === 'get_formulario') {
                console.log(data);
                context.url = 'http://ec2-54-164-250-93.compute-1.amazonaws.com/Sueltos/formUniversalPago.html?task=' + context.contextId;
                callback(null, data);
            } 
            if (componentName === 'open_formulario'){
                console.log(data);
                callback(null, new sdk.AsyncResponse());
                let dir = context.contextId;
                form.post(`/:${dir}`, function(req, res){
                    try {
                        context.dataForm = req.body;
                        sdk.respondToHook(data);
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