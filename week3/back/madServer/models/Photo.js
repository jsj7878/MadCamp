const mongoose = require('mongoose');
const crypto = require('crypto');

const photoSchema = new mongoose.Schema({
    userList : [String],
    server_place : String,
    time : String,
    explain : String,
    id : {type : Number}

});

module.exports = mongoose.model('Photo',photoSchema);