// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var tokenManager = require(rootPath + 'API/config/tokenManager');
var userRepo = require(rootPath + 'BL/repositories/user/userRepository');

// PUBLIC METHODS
// =============================================================================
var loginCtrl = function (req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    
    if (email === '' || password === '') {
        res.status(400);
        res.json({
            'status': 400,
            'message': 'Oops! Invalid credentials.'
        });
    } else {
        userRepo.getUserByEmailAndPassword(email, password, function (user) {
            if (user === null) {
                res.status(400);
                res.json({
                    'status': 400,
                    'message': 'Oops! Invalid credentials.'
                });
            } else if (user.isActive === false) {
                res.status(400);
                res.json({
                    'status': 400,
                    'message': 'Oops! Your account has been disabled.'
                });
            } else {
                var userId = user._id;
                tokenManager.generateToken(userId, function (token) {
                    if (token === null) {
                        res.status(400);
                        res.json({
                            'status': 400,
                            'message': 'Oops! Invalid credentials.'
                        });
                    } else {
                        res.status(200);
                        res.json({
                            'status': 200,
                            'token' : token
                        });
                    }                      
                });              
            }
        });
    }
    return;   
};

module.exports = loginCtrl;