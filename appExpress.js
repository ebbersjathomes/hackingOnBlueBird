var express	= require("express"),
	Promise	= require("bluebird");

var app = express();

app.get("/serverStats.json",function(req, resp, next){
	var fs		= Promise.promisifyAll(require("fs")),
		date	= req.query.date || '20131113';
	fs.readFileAsync("log/access_" + date)
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
	.then(function(result){
		resp.json(200,{"status" : true, "stats" : result});
	})
	.catch(function(e){
		next(e);
	})
});

app.get("/codeError.json", function(req, resp, next){
	//This call will error as bar is not defined. Note that the promise handles the error and returns it to express.
	var test = new Promise(function(){
		var foo = new bar;
	});
	test
	.catch(function(e){
		next(e);
	});
});

app.get("/sampleRoute.json",require("./modules/sampleRoute"));

app.use(function(err, req, resp, next){
  console.error(err.stack);
  resp.json(500, {"status" : false, "message" : "Hmm Something's not right"});
});

var server = app.listen(4545, function() {
    console.log('Listening on port %d', server.address().port);
});