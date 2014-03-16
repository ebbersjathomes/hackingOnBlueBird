var express	= require("express"),
	Promise	= require("bluebird");

var app = express();

app.use(require("express-promise")());

app.get("/test",function(req, resp, next){
	resp.json(require("./modules/samplePromise"));
});

app.get("/NotAPromise",function(req, resp, next){
	resp.json({"status" : true, "message" : "It worked"});
});

app.use(function(err, req, resp, next){
  console.error(err.stack);
  resp.json(500, {"status" : false, "message" : "Hmm Something's not right"});
});

var server = app.listen(4546, function() {
    console.log('Listening on port %d', server.address().port);
});