var botId          = "st-c4beedf8-0ace-5f49-84e5-ee680663c812";
var botName        = "Nadro VA";
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
        // console.log("llamada al webhook");
        let id = data._originalPayload.contextId;
        try{
            if (componentName === 'get_formulario') {
                // console.log(data);
                data.context.url = 'http://ec2-54-164-250-93.compute-1.amazonaws.com/Sueltos/formularioNadro.html?task=' + id;
                callback(null, data);
            } 
            if (componentName === 'open_formulario'){
                // console.log(data);
                callback(null, new sdk.AsyncResponse());
                form.post(`/:${id}`, function(req, res){
                    try {
                        data.context.dataForm = req.body;
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