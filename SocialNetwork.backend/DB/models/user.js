// NODE PACKAGES
// =============================================================================
var mongoose = require('mongoose');
var validate = require('mongoose-validator');

// SETTINGS
var FIRSTNAME_MIN_LENGTH = 1;
var FIRSTNAME_MAX_LENGTH = 100;
var LASTNAME_MIN_LENGTH = 1;
var LASTNAME_MAX_LENGTH = 100;
var NICKNAME_MIN_LENGTH = 1;
var NICKNAME_MAX_LENGTH = 100;

var DEFAULT_VISIBILITY = 'All';

// VALIDATORS
// =============================================================================
var firstnameValidator = [
    validate({
        validator: 'isLength',
        arguments: [FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH]
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true
    })
];
var lastnameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 100]       
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true
    })
];
var nicknameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 100]
    })
];
var emailValidator = [
    validate({
        validator: 'isEmail'
    })
];

// ENUMS
// =============================================================================
var visibleStates = [
    'All',
    'Friends',
    'Only me'
];
var relationshipStates = [
    'Complicated',
    'Divorced',
    'Engaged',
    'In a relationship',
    'In an open relationship',
    'Married',
    'Single',
    'Separated',
    'Widowed'
];

// DATABASE SCHEMA
// =============================================================================
var Schema = mongoose.Schema;
// USER
var User = new Schema({
    // USER AUTH INFORMATION
    authInfo: {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isValidated: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        },
        profilePicture: {
            type: String
        },
        profileCoverPicture: {
            type: String
        }
    },
    // USER RESTRICTED INFORMATION
    restrictedInfo: {
        password: {
            type: String,
            required: true
        },     
        isActive: {
            type: Boolean,
            default: true
        }
    },
    // USERNAME INFORMATION
    nameInfo: {
        // search field
        firstname: {
            type: String,
            required: true,
            index: true
        },
        // search field
        lastname: {
            type: String,
            required: true,
            index: true
        },
        nickname: {
            type: String
        }
    },
    // USER BASIC INFORMATION
    basicInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        // search field
        gender: {
            type: String,
            required: true,
            index: true
        },
        birthday: {
            type: Date,
            required: true
        },
        // search field
        birthyear: {
            type: Number,
            index: true
        }
    },
    // USER LOCATION INFORMATION
    locationInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        currentCity: {
            type: String,
            index: true
        },
        hometown: {
            type: String,
            index: true
        }
    },
    // USER WORK INFORMATION
    workInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        currentWorkplace: {
            type: String
        },
        previousWorkplaces: {
            type: String
        }
    },
    // USER EDUCATION INFORMATION
    educationInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        highschool: {
            type: String,
            unique: true,
        },
        college: {
            type: String,
            unique: true,
        },
        awards: [{
                type: String,
                unique: true,
            }],
        certifications: [{
                type: String,
                unique: true,
            }],
        skills: [{
                type: String,
                unique: true,
            }],
    },
    // USER RELATIONSHIP INFORMATION
    relationshipInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        name: {
            type: String,
            enum: relationshipStates,
            default: 'Single',
            index: true
        }
    },
    // USER DETAILS INFORMATION
    detailsInfo: {
        visibleTo: {
            type: String,
            default: DEFAULT_VISIBILITY
        },
        aboutMe: {
            type: String,
        }
    }
});

var UserBirthyear = new Schema({
    year: {
        type: Number,
        unique: true
    }
});

var UserCity = new Schema({
    name: {
        type: String,
        unique: true
    }
});

var UserWorkplace = new Schema({
    name: {
        type: String,
        unique: true
    }
});

var UserHighSchool = new Schema({
    name: {
        type: String,
        unique: true,
    }
});

var UserCollege = new Schema({
    name: {
        type: String,
        unique: true,
    }
});

var UserAward = new Schema({
    name: {
        type: String,
        unique: true,
    }
});

var UserCertification = new Schema({
    name: {
        type: String,
        unique: true,
    }
});

var UserSkill = new Schema({
    name: {
        type: String,
        unique: true,
    }
});

// ADD PROFILE PICTURE !!!

var userModel = mongoose.model('User', User);
var userBirthyearModel = mongoose.model('UserBirthyear', UserBirthyear);

module.exports.userModel = userModel;
module.exports.userBirthyearModel = userBirthyearModel;