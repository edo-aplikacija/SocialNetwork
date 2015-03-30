// NODE PACKAGES
// =============================================================================
var jwt = require('jwt-simple');

// LOAD MODULES
// =============================================================================
var rootPath = '../../';
var tokenSecret = require(rootPath + 'API/config/tokenSecret');
var tokenManager = require(rootPath + 'API/config/tokenManager');

module.exports = function (req, res, next) {
    
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 
    
    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    if (req.headers && req.headers.authorization) {
        try {
            var parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
                var nameOfToken = parts[0];
                var token = parts[1];
                if (nameOfToken === 'JWT') {
                    if (token) {
                        var decoded = jwt.decode(token, tokenSecret);
                        var userId = decoded.userId;
                        if (decoded.exp <= Date.now()) {
                            // token has expired, generate new one                           
                            tokenManager.generateToken(userId, function (genToken) {
                                if (genToken === null) {
                                    res.status(401);
                                    res.json({
                                        "status": 401,
                                        "message": "Invalid token."
                                    });
                                    return;
                                } else {
                                    // attach currentUserId to request and new token to response
                                    req.currentUserId = userId;
                                    res.token = genToken;
                                    next();
                                }
                            });
                        } else {
                            // attach currentUserId to request to request
                            req.currentUserId = userId;
                            next();
                        }
                    } else {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid token."
                        });
                        return;
                    }
                }
            } else {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid token."
                });
                return;           
            }
        } catch (err) {
            console.log('isAuthenticated', err)
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid token."
            });
            return; 
        }
        
    }
};