// server.js

// BASE SETUP
// =============================================================================

// NODE PACKAGES
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// LOAD MODULES
// =============================================================================
var rootPath = './';
var routes = require(rootPath + 'API/routes/routes');
var mongodb = require(rootPath + 'DB/config/mongodb');

// DB
// =============================================================================
mongodb.startConnection();


// BODY PARSER
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS HEADERS
// =============================================================================
app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "http://localhost:8020"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.set('Access-Control-Allow-Credentials', true);
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization,X-Requested-With');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// SET PORT
// =============================================================================
var port = process.env.PORT || 8080;

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);