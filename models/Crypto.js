const mongoose = require('mongoose');

const cryptoSchmema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Name is too short"]
    },
    imageUrl:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "URL is invalid"
        }
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Incorect Price"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description is too short"],
    },
    payment: {
        type: String, 
        required: true,
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