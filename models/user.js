const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})


const UsersModel = mongoose.model('Users',userSchema);



module.exports = UsersModel;

















