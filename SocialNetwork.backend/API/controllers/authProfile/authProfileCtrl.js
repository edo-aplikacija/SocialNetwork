// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var userRepo = require(rootPath + 'BL/repositories/user/userRepository');

// PUBLIC METHODS
// =============================================================================
var authProfileCtrl = function (req, res) {
    var userId = req.currentUserId;
    userRepo.getUserInitDataByUserId(userId, function (user) {
        if (user === null) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "User is disabled."
            });
        } else {
            res.status(200);
            res.json({
                'status': 200,
                'data' : user
            });
        }
    });      
    return;
};

module.exports = authProfileCtrl;