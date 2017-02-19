/**
 * http://usejsdoc.org/
 */
exports.generatePayload=function(payload, action){
	var filteredPayload = JSON.parse(JSON.stringify(payload));
	if(action === 'SyncCustomer'){
		return filteredPayload.customer;
	}
	else if(action === 'SyncSubscription'){
		return filteredPayload.subscription;
	}
};