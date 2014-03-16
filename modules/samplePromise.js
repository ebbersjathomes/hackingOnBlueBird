var Promise	= require("bluebird");

module.exports = new Promise(function(resolve){
	resolve({"status" : true, "message" : "Foo"})
});