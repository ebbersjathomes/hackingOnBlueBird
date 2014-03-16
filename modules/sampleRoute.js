var Promise	= require("bluebird");

module.exports = function(req, resp, next){
	//The idea is that this can eventually be a module
	return new Promise(function(resolve){
		resolve({"status" : true, "message" : "Foo"});
	})
	.then(function(payload){
		resp.json(200,payload);
	}).catch(function(e){
		next(e);
	});
}