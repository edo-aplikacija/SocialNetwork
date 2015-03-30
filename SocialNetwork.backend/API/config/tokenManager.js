// NODE PACKAGES
// =============================================================================
var jwt = require('jwt-simple');

// SETTINGS
// =============================================================================
var DAYS_TO_EXPIRE = 1;
var TOKEN_SECRET = '5555';

// PUBLIC METHODS
// =============================================================================
var tokenManager = {
    generateToken : function (userId, callback) {
        try {
            var expires = expiresIn(DAYS_TO_EXPIRE);
            var payload = { exp: expires, userId: userId };           
            var token = jwt.encode(payload, TOKEN_SECRET);           
            return callback(token);
        } catch (err) {
            console.log('generateToken err' , err);
            return callback(null);
        }       
    }
};

// PRIVATE METHODS
// =============================================================================
var expiresIn = function(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = tokenManager;