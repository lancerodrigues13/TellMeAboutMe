/**
 * http://usejsdoc.org/
 */
require('cloudant');
var getService= function(cloudantDB, serviceName, callback){
	//console.log("serviceName : " +serviceName);
	cloudantDB.get(serviceName, function(err, body) {
		//console.log('connectin to db');
		  if (!err){
			  //console.log(body); 
			  callback(body);
		  }
		  else{
			  console.log("error " + err);
		  } 
	});
};
exports.getService=getService;