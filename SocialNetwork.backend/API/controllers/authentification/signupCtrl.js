// NODE PACKAGES
// =============================================================================
var validator = require('validator');

// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var tokenManager = require(rootPath + 'API/config/tokenManager');
var userRepo = require(rootPath + 'BL/repositories/user/userRepository');

var FORM_ERROR_MSG = 'Oops! Form is not valid.';

// PUBLIC METHODS
// =============================================================================
var signupCtrl = function (req, res) {
    
    var form = {};

    form.firstname = req.body.firstname || '';
    form.lastname = req.body.lastname || '';
    form.email = req.body.email || '';
    form.password = req.body.password || '';
    form.gender = req.body.gender || '';
    form.birthday = req.body.birthday || '';
    
    if (form.firstname === '' || form.lastname === '' || form.email === '' || form.password === '' || form.gender === '' || form.birthday === '') {
        res.status(400);
        res.json({
            'status' : 400,
            'message': FORM_ERROR_MSG
        });
    } else {
        userRepo.saveNewUser(form, function (user, message) {
            if (user === null) {
                res.status(400);
                res.json({
                    'status' : 400,
                    'message': message
                });
            } else {
                var userId = user._id;
                tokenManager.generateToken(userId, function (token) {
                    res.status(200);
                    res.json({
                        'status': 200,
                        'token' : token
                    });
                });
            }
        });
    }
    return;
};

module.exports = signupCtrl; 