// Setup express app
var express = require('express');
var app = express();


// Setup port
var port = process.env.PORT || 8080;

// Setup middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

	if ('OPTIONS' === req.method) {
		res.status(200).end();
	} else {
		next();
	}
});



var express = require('express'), app = express()

// Set static file location
app.use(express.static('./app'));
// Log every request to console
app.use(morgan('dev'));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended' : 'true'}));
// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({type:'application/vnd.api+json'}));
// Lets you use http verbs put or delete
app.use(methodOverride());
app.use('/bower_components', express.static('./bower_components'));

// Load the routes
// require('./routes/patientRoutes')(app, isLoggedIn);
// require('./routes/examRoutes')(app, isLoggedIn);
// require('./routes/userRoutes')(app, passport); // Pass in passport to route

// Listen
app.listen(port);
console.log("App listening on port " + port);