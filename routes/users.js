var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/image_editing");

var userSchema = mongoose.Schema({
    profilepic:{
        type:String,
        default:"def.jfif"
    },
})

module.exports = mongoose.model("user",userSchema);