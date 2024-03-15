const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type : String, required : true},
    email: {type : String, required : true},
    password: {type : String, required : true},
    role : {type : String, enum : ["admin","user"], default: "user",unique: true}
})

const userModel = mongoose.model('testUser',userSchema);

module.exports = {
    userModel
}