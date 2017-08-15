var mongoose = require('mongoose');
var UserSchemas = require('../schemas/use');
var User = mongoose.module('User', UserSchemas);

module.exports = User