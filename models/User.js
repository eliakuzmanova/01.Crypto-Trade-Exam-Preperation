const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [5, "Too short username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: [10, "Too short email"],
        validation: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;