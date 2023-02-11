const mongoose = require('mongoose');

const cryptoSchmema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
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