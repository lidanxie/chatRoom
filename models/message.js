var mongoose = require('mongoose')
var MessageSchema = require('../schemas/message');
var Message = mongoose.module('Message', MessageSchema);

module.exports = Message