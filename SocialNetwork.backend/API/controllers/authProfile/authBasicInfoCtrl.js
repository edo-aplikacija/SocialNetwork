// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var userRepo = require(rootPath + 'BL/repositories/user/userRepository');

var FIELD_ERROR_MSG = 'Oops! Value is not valid.';

// PUBLIC METHODS
// =============================================================================
var authBasicInfoCtrl = {
    getBasicInfo : function (req, res) {
        var userId = req.currentUserId;
        userRepo.getUserBasicInfoByUserId(userId, function (user) {
            res.status(200);
            res.json({
                'status': 200,
                'data' : user.basicInfo
            });
            return;
        });
    },
    updateBasicInfo: function (req, res) {
        var userId = req.currentUserId;
        var form = {};
        form.field = req.body.fieldToUpdate || '';
        form.value = req.body.valueToUpdate || '';
        if (form.field === '' || form.value === '') {
            res.status(400);
            res.json({
                'status': 400,
                'message' : FIELD_ERROR_MSG
            });
            return;
        } else {
            userRepo.updateBasicInfo(userId, form, function (value, error) {
                if (error === null) {
                    res.status(200);
                    res.json({
                        'status': 200,
                        'data': value
                    });
                    return;                
                } else {
                    res.status(400);
                    res.json({
                        'status': 400,
                        'message' : error
                    });
                    return;
                }
            }); 
        }
    }    
};

module.exports = authBasicInfoCtrl;