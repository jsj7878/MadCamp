const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    contentname : String,
    weekOpen : String,
    weekClose : String,
    weekendOpen : String,
    weekendClose : String

});

module.exports = mongoose.model('Food',foodSchema);