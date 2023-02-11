const mongoose = require('mongoose');

const cryptoSchmema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name is too short"]
    },
    imageUrl:{
        type: String,
        required: [true, "Image URL is required"],
        validate: {
            validator: function(value) {
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "URL is invalid"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Incorect Price"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description is too short"],
    },
    payment: {
        type: String, 
        required: [true, "Payment is required"],
        enum: ["crypto-wallet", "credit-card", "debit-card", "paypal"]
    },
    users:[{
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }
})

const Crypto = mongoose.model('Crypto', cryptoSchmema)
module.exports = Crypto