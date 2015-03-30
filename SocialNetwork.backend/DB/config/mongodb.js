var mongoose = require('mongoose');

var mongodbURL = 'mongodb://localhost/testdb1';
var mongodbOptions = {};

var mongodb = {
    startConnection : function () {
        mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
            if (err) {
                console.log('Connection refused to ' + mongodbURL);
                console.log(err);
            } else {
                console.log('Connection successful to: ' + mongodbURL);
            }
        });
    }
};

module.exports = mongodb;