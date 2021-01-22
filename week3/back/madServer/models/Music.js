const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    key : String,
    user : String,
    explain : String,
    time : String

});

module.exports = mongoose.model('Music',musicSchema);