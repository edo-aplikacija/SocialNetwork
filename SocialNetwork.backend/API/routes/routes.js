// NODE PACKAGES
// =============================================================================
var express = require('express');
var app = express();
// LOAD MODULES
// =============================================================================
var rootPath = '../../';
// MIDDLEWARES
var isAuth = require(rootPath + 'API/middlewares/isAuth');
// CONTROLLERS
var loginCtrl = require(rootPath + 'API/controllers/authentification/loginCtrl');
var signupCtrl = require(rootPath + 'API/controllers/authentification/signupCtrl');
var authProfileCtrl = require(rootPath + 'API/controllers/authProfile/authProfileCtrl');
var authAboutMeInfoCtrl = require(rootPath + 'API/controllers/authProfile/authAboutMeInfoCtrl');
var authBasicInfoCtrl = require(rootPath + 'API/controllers/authProfile/authBasicInfoCtrl');

// ROUTES FOR OUR API
// =============================================================================
// (accessed at http://localhost:8080/api)
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'This is /api' });
});
// PUBLIC
app.use('/', router);
app.post('/login', loginCtrl);
app.post('/signup', signupCtrl);
// ONLY AUTHENTIFICATED USERS
app.get('/auth-profile', [isAuth], authProfileCtrl);
app.get('/auth-about-me-info', [isAuth], authAboutMeInfoCtrl.getAboutMeInfo);
app.get('/auth-basic-info', [isAuth], authBasicInfoCtrl.getBasicInfo);
app.put('/auth-basic-info', [isAuth], authBasicInfoCtrl.updateBasicInfo);

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;