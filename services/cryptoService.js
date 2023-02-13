const Crypto = require("../models/Crypto");

exports.createCrypto = (name, imageUrl, price, description, payment,owner) => Crypto.create({name, imageUrl, price, description, payment,owner: owner});

exports.getAllCrypto = () => Crypto.find().lean();

exports.getOneCrypto = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.editCrypto = (name, imageUrl, price, description, payment, cryptoId) => Crypto.findByIdAndUpdate(cryptoId,{ name, imageUrl, price, description, payment})

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndRemove(cryptoId)

exports.addUser = (users, cryptoId) => Crypto.findByIdAndUpdate(cryptoId,{users})

exports.findIsUser = (user, cryptoId) => Crypto.findOne({$and: [{users: {$eq: user}}, {_id: {$eq: cryptoId}}] }).lean();