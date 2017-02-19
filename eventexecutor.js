/**
 * http://usejsdoc.org/
 */
var serviceReg = require('./serviceregistry.js');
var request = require('request');
var intentManager = require('./intentmanager.js');
var payloadGenerator = require('./payloadgenerator.js');


/**
 * Retrieves serviceDetails from serviceRegistry 
 * @param serviceList
 * @returns
 */
function getServices(db, serviceNameList, callback){
	//console.log("serviceNameList :" + serviceNameList.toString());
	for(var serviceIndex in serviceNameList){
		if(serviceIndex !== null){
			serviceReg.getService(db, serviceNameList[serviceIndex], function(serviceName){
				callback(serviceName);
			});
		}
	}
}

exports.executeEvent = function(db, intent, data, callback){
	intentManager.getActions(db, intent, function(action){
		//console.log("actions: %j", actions);
		var payload = payloadGenerator.generatePayload(data.payload, action);
		payload.action=action;
		//console.log("intial payload %j", payload);
		//console.log("data: %j", data);
		getServices(db, data.serviceList, function(service){
			if(service !== null){
				var username = "8eaf2ee6-58c6-4941-a563-955b091048f5",
			    password = "a6lGFAU0h9bW5Nns8mTdLdJkpcQCpGJztzB7ESIHMkaW4MB4v2R0Sybvo8I0rlDE",
			    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
				request({
					method: 'POST',
					uri: service.url,
					headers: {'content-type' : 'application/json',
						'Authorization' : auth
					},
					json: payload
				}, function(error, response, body){
					if(error != null && error !==undefined){
						console.log(error);
					}
				});
				console.log("service %j", service)
				console.log("payload %j",payload);
			}
		});
		callback();
	});
	
} ;


