/**
 * http://usejsdoc.org/
 */

exports.getActions = function(db, intent, callback){
	console.log("intent " + intent)
	db.get(intent, function(err, intent) {
		if (!err){
			console.log(intent);
			for(var actionIndex in intent.actions){
				if(actionIndex !== undefined){
					callback(intent.actions[actionIndex]);
				}
			}
		}
		else{
			console.log("error " + err);
		} 
	});
};