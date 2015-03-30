// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var userRepo = require(rootPath + 'BL/repositories/user/userRepository');

// PUBLIC METHODS
// =============================================================================
var authAboutMeInfoCtrl = {
    getAboutMeInfo : function (req, res) {
        var userId = req.currentUserId;
        userRepo.getAboutMeInfoByUserId(userId, function (user) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : user
            });
            return;
        });
    }
};

module.exports = authAboutMeInfoCtrl;