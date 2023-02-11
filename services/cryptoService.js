const Crypto = require("../models/Crypto");

exports.createCrypto = (name, imageUrl, price, description, payment) => Crypto.create({name, imageUrl, price, description, payment});

