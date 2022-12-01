var botId          = "2RbmH8k/4oix+Xc/p4jtSgOGI6XJHbIePslHSqfiCbM=";
var botName        = "Nadro VA2";
var sdk            = require("./lib/sdk");
var Promise        = sdk.Promise;
var request        = require("request");
var config         = require("./config");
const requestStore = require("./lib/sdk/lib/requestStore");
const form = require("express").Router();


// function connectToAgent(requestId, data, cb){
//     var formdata = {};
//     formdata.licence_id = config.liveagentlicense;
//     formdata.welcome_message = "";
//     var visitorId = _.get(data, 'channel.channelInfos.from');
//     if(!visitorId){
//         visitorId = _.get(data, 'channel.from');
//     }
//     userDataMap[visitorId] = data;
//     data.message="An Agent will be assigned to you shortly!!!";
//     sdk.sendUserMessage(data, cb);
//     formdata.welcome_message = "Link for user Chat history with bot: "+ config.app.url +"/history/index.html?visitorId=" + visitorId;
//     return api.initChat(visitorId, formdata)
//          .then(function(res){
//              _map[visitorId] = {
//                  secured_session_id: res.secured_session_id,
//                  visitorId: visitorId,
//                  last_message_id: 0
//             };
//         });
// }

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
    },
    // on_agent_transfer  : function (requestId, data, callback){
    //     try {
    //         console.log('Llamada al agente');
    //         connectToAgent(requestId, data, callback);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
};