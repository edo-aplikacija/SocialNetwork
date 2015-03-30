// NODE PACKAGES
// =============================================================================
var db = require('mongoose');
var validator = require('validator');
// LOAD MODULES
// =============================================================================
var rootPath = '../../../';
var userModel = require(rootPath + 'DB/models/user').userModel;
var userBirthyearModel = require(rootPath + 'DB/models/user').userBirthyearModel;

// SETTINGS
// =============================================================================
var FORM_ERROR_MSG = 'Oops! Form is not valid.';
var FIELD_ERROR_MSG = 'Oops! Value is not valid.';
var USER_EXISTS_ERROR_MSG = 'Oops! User already exist with provided email.';
var VISIBILITY = [
    'All',
    'Friends',
    'Only me'
];
var VISIBILITY_ERROR_MSG = 'Oops! Visibility is not valid.';
// AUTH INFO
var EMAIL_ERROR_MSG = 'Oops! Email is not valid.';
// RESTICTED INFO
var PASSWORD_MIN_LENGTH = 6;
var PASSWORD_MAX_LENGTH = 30;
var PASSWORD_ERROR_MSG_LEN = 'Oops! Password should be between ' + PASSWORD_MIN_LENGTH + ' and ' + PASSWORD_MAX_LENGTH + ' characters.';
// NAME INFO
var FIRSTNAME_MIN_LENGTH = 1;
var FIRSTNAME_MAX_LENGTH = 100;
var FIRSTNAME_ERROR_MSG_LEN = 'Oops! Firstname should be between ' + FIRSTNAME_MIN_LENGTH + ' and ' + FIRSTNAME_MAX_LENGTH + ' characters.';
var FIRSTNAME_ERROR_MSG_ALFANUM = 'Oops! Firstname should be alphanumeric.';
var LASTNAME_MIN_LENGTH = 1;
var LASTNAME_MAX_LENGTH = 100;
var LASTNAME_ERROR_MSG_LEN = 'Oops! Lastname should be between ' + LASTNAME_MIN_LENGTH + ' and ' + LASTNAME_MAX_LENGTH + ' characters.';
var LASTNAME_ERROR_MSG_ALFANUM = 'Oops! Lastname should be alphanumeric.';
var NICKNAME_MIN_LENGTH = 1;
var NICKNAME_MAX_LENGTH = 100;
var NICKNAME_ERROR_MSG_LEN = 'Oops! Nickname should be between ' + NICKNAME_MIN_LENGTH + ' and ' + NICKNAME_MAX_LENGTH + ' characters.';
// BASIC INFO
var BIRTHDAY_MAX_YEAR = 0; // from current date
var BIRTHDAY_MIN_YEAR = 100//from current date
var BIRTHDAY_ERROR_MSG = 'Oops! Birthday is not valid date.';
var GENDER = [
    'Male', 'Female'
];
var GENDER_ERROR_MSG = 'Oops! Gender is not valid.';
// PROFILE AND COVER PICTURE 
var PROFILE_PICTURE_MALE = 'http://localhost:8020/content/images/profile-male.png';
var PROFILE_PICTURE_FEMALE = 'http://localhost:8020/content/images/profile-female.png';
var PROFILE_COVER = 'http://localhost:8020/content/images/profile-cover.jpg';

// PUBLIC METHODS
// =============================================================================
var userRepository = {
    getUserByEmailAndPassword : function (email, password, callback) {              
        userModel.findOne({ 'authInfo.email': email, 'restrictedInfo.password': password }, function (err, user) {
            if (err) {
                console.log('getUserByEmailAndPassword error', err);
                return callback(null);
            } else {
                console.log('getUserByEmailAndPassword user', user);
                return callback(user);
            }                 
        });
    },
    // auth info, name info, basic info
    getUserInitDataByUserId : function (userId, callback) {
        userModel.findOne({ '_id': userId, 'restrictedInfo.isActive': true }, 'authInfo nameInfo', function (err, user) {
            if (err) {
                console.log('getUserInitDataByUserId error', err);
                callback(null);
            } else {
                callback(user);
            }
        });
    },
    // about me
    getAboutMeInfoByUserId: function (userId, callback) {
        userModel.findOne({ '_id': userId, 'restrictedInfo.isActive': true }, 'nameInfo basicInfo locationInfo workInfo educationInfo relationshipInfo detailsInfo', function (err, user) {
            if (err) {
                console.log('getAboutMeInfoByUserId error', err);
                callback(null);
            } else {
                callback(user);
            }
        });
    },
    // basic info
    getUserBasicInfoByUserId : function (userId, callback) {
        userModel.findOne({ '_id': userId, 'restrictedInfo.isActive': true }, 'basicInfo', function (err, user) {
            if (err) {
                console.log('getUserBasicInfoByUserId error', err);
                callback(null);
            } else {
                callback(user);
            }
        });
    },
    updateBasicInfo : function (userId, form, callback) {
        var formValidation = updateBasicInfoFormValidation(form);
        if (formValidation === true) {
            var updateForm = {};
            var fieldprefix = 'basicInfo.';
            updateForm[fieldprefix + form.field] = form.value;
            if (form.field === 'birthday') {
                var newYear = birthdayToBirthyear(form.value);
                updateForm[fieldprefix + 'birthyear'] = newYear;
                addUserBirthdayYear(newYear);
            }
            userModel.update({ '_id': userId }, { $set: updateForm }, function (err, result) {
                if (err) {
                    console.log('updateBasicInfo error', err);
                    return callback(null, FIELD_ERROR_MSG);
                } else if (result === 0) {
                    return callback(null, FIELD_ERROR_MSG);
                } else {                    
                    console.log('updateBasicInfo result', result);
                    return callback(form.value, null);
                }
            });
        } else {
            return callback(null, formValidation);
        }
    },
    saveNewUser : function (form, callback) {
        
        var formValidation = saveNewUserFormValidation(form);

        if (formValidation === true) {
            // check if user already exists
            userModel.find({ 'authInfo.email': form.email }, function (err, result) {
                if (err) {
                    console.log('check if user exists error', err);
                    return callback(null, FORM_ERROR_MSG);
                } else if (result !== null) {
                    return callback(null, USER_EXISTS_ERROR_MSG);
                } else {                
                    var newUser = new userModel();
                    // auth info
                    newUser.authInfo.email = form.email;
                    // profile and cover picture
                    newUser.authInfo.profilePicture = pathToDefaultProfilePicture(form.gender);
                    newUser.authInfo.profileCoverPicture = PROFILE_COVER;
                    // restricted info
                    newUser.restrictedInfo.password = form.password;
                    // name info
                    newUser.nameInfo.firstname = form.firstname;
                    newUser.nameInfo.lastname = form.lastname;
                    // basic info        
                    newUser.basicInfo.gender = form.gender;
                    newUser.basicInfo.birthday = new Date(form.birthday);
                    newUser.basicInfo.birthyear = birthdayToBirthyear(form.birthday)
                    // save
                    newUser.save(function (err, user) {
                        if (err) {
                            console.log('saveNewUser error', err);
                            return callback(null, FORM_ERROR_MSG);
                        } else {
                            // add new year
                            var yearToAdd = user.basicInfo.birthyear;
                            addUserBirthdayYear(yearToAdd);
                            
                            console.log('saveNewUser user', user);
                            return callback(user, null);
                        }
                    });
                }
            });           
        } else {
            return callback(null, formValidation);
        } 
    }
};

// PRIVATE METHODS
// =============================================================================
var addUserBirthdayYear = function (year) {
    var newUserYear = new userBirthyearModel();
    newUserYear.year = year;
    newUserYear.save(function (err, year) {
        if (err) {
            console.log('newUserYear err', err);
        } else {
            console.log('newUserYear year', year);
        }
    });
};
var pathToDefaultProfilePicture = function (gender){
    if (gender === 'Male') {
        return PROFILE_PICTURE_MALE;
    } else {
        return PROFILE_PICTURE_FEMALE;
    }
};
var birthdayToBirthyear = function (birthdate) {
    var newDate = new Date(birthdate);
    return newDate.getFullYear();
};
// FORM VALIDATION
// =============================================================================
var saveNewUserFormValidation = function (form) {
    try {
        if (!emailValidation(form.email)) {
            return EMAIL_ERROR_MSG;
        } else if (!passwordValidation(form.password)) {
            return PASSWORD_ERROR_MSG_LEN;
        } else if (!firstnameLengthValidation(form.firstname)) {
            return FIRSTNAME_ERROR_MSG_LEN;
        } else if (!isAlphaNumericValidation(form.firstname)) {
            return FIRSTNAME_ERROR_MSG_ALFANUM;
        } else if (!lastnameLengthValidation(form.lastname)) {
            return LASTNAME_ERROR_MSG_LEN;
        } else if (!isAlphaNumericValidation(form.lastname)) {
            return LASTNAME_ERROR_MSG_ALFANUM;
        } else if (!birthdayValidation(form.birthday)) {
            return BIRTHDAY_ERROR_MSG;
        } else if (!genderValidation(form.gender)) {
            return GENDER_ERROR_MSG;
        } else {
            return true;
        }       
    } catch (err) {
        console.log('saveNewUserFormValidation error', err);
        return FORM_ERROR_MSG;
    }
};
var updateBasicInfoFormValidation = function (form) {
    try {
        if (form.field === 'visibleTo') {
            if (visibleToValidation(form.value)) {
                return true;
            } else {
                return VISIBILITY_ERROR_MSG;
            }
        } else if (form.field === 'gender') {
            if (genderValidation(form.value)) {
                return true;
            } else {
                return GENDER_ERROR_MSG;
            }
        } else if (form.field === 'birthday') {
            if (birthdayValidation(form.value)) {
                return true;
            } else {
                return BIRTHDAY_ERROR_MSG;
            }
        } else {
            return FIELD_ERROR_MSG;
        }
    } catch (err) {
        console.log('updateBasicInfoFormValidation error', err);
        return FIELD_ERROR_MSG;
    }
    
};
// FIELD VALIDATION
// =============================================================================
// AUTH INFO
var emailValidation = function (email) {
    return validator.isEmail(email);
};
// RESTICTED INFO
var passwordValidation = function (password) {
    return validator.isLength(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
};
// NAME INFO
var firstnameLengthValidation = function (firstname) {
    return validator.isLength(firstname, FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH);
};
var isAlphaNumericValidation = function (value) {
    return validator.isAlphanumeric(value);
};
var lastnameLengthValidation = function (lastname) {
    return validator.isLength(lastname, LASTNAME_MIN_LENGTH, LASTNAME_MAX_LENGTH)
};
// BASIC INFO
var birthdayValidation = function (birthday) {
    if (validator.isDate(birthday)) {
        var dateSubmited = new Date(birthday);
        var minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - BIRTHDAY_MIN_YEAR);
        var maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - BIRTHDAY_MAX_YEAR);
        if (dateSubmited <= maxDate && dateSubmited >= minDate) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
var genderValidation = function (gender) {
    if (GENDER.indexOf(gender) > -1) {
        return true;
    } else {
        return false;
    }
};

var visibleToValidation = function (visibleTo) {
    if (VISIBILITY.indexOf(visibleTo) > -1) {
        return true;
    } else {
        return false;
    }
};

module.exports = userRepository;