var Promise = require("bluebird");
var fs		= Promise.promisifyAll(require("fs")); //Adds a new method fooAsync in my case readFileAsync

fs.readFileAsync("log/access_20131113")
.then(function(file){
	return file.toString().split('\n');
})
.map(JSON.parse)
.reduce(function(report,thisEntry){
	report.total++;
	if(thisEntry.responseTime > 100){
		report.slow++
	}
	return report;
},{"total" : 0, "slow" : 0})
.then(console.log)
.catch(function(e){
	console.error(e);
})