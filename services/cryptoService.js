const Crypto = require("../models/Crypto");

exports.createCrypto = (name, imageUrl, price, description, payment,owner) => Crypto.create({name, imageUrl, price, description, payment,owner: owner});

exports.getAllCrypto = () => Crypto.find().lean();

exports.getOneCrypto = (cryptoId) => Crypto.findById({_id: cryptoId}).lean();

exports.editCrypto = (name, imageUrl, price, description, payment, cryptoId) => Crypto.findByIdAndUpdate(cryptoId,{ name, imageUrl, price, description, payment})

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndRemove(cryptoId)