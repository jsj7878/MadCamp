const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name : {type :String, required: true},
    phone : String,
    email : String,
    profile_photo : String,
    posting_list : [String],
    profile: String

});



module.exports = mongoose.model('User',userSchema);