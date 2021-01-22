const mongoose = require('mongoose');

const jocheonSchema = new mongoose.Schema({
    content: String,
    contentname : String,
    address : String,
    latitude : String,
    longitude : String,
    contentid : String,
    score : String
    
});

module.exports = mongoose.model('Jocheon',jocheonSchema);