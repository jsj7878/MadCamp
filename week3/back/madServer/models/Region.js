const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    region : String
    
});

module.exports = mongoose.model('Region',regionSchema);