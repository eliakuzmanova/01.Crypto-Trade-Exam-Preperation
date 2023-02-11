const Crypto = require("../models/Crypto");

exports.createCrypto = (name, imageUrl, price, description, payment,owner) => Crypto.create({name, imageUrl, price, description, payment,owner: owner});

exports.getAllCrypto = () => Crypto.find().lean();

// export.getOneCrypto = () => Crypto.find()